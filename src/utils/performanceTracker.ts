import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

export interface PerformanceMetric {
  name: 'LCP' | 'CLS' | 'FCP' | 'TTFB' | 'INP' | 'FID';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  formatted: string;
  delta?: number;
  id?: string;
  timestamp: number;
}

export interface SystemPerformance {
  fps: number;
  memoryUsageMb?: number;
  memoryLimitMb?: number;
  networkType?: string;
  downlinkSpeed?: number;
  roundTripTime?: number;
  pageLoadTimeMs?: number;
  domReadyTimeMs?: number;
  serviceWorkerActive: boolean;
}

type MetricListener = (metrics: Record<string, PerformanceMetric>, system: SystemPerformance) => void;

class PerformanceTrackerService {
  private metrics: Record<string, PerformanceMetric> = {};
  private listeners: Set<MetricListener> = new Set();
  private system: SystemPerformance = {
    fps: 60,
    serviceWorkerActive: false,
  };
  private isMonitoringFPS = false;
  private frameCount = 0;
  private lastFpsTimestamp = performance.now();

  constructor() {
    if (typeof window === 'undefined') return;
    this.initWebVitals();
    this.initNavigationTimings();
    this.initNetworkInfo();
    this.initServiceWorkerCheck();
    this.startFPSMonitor();
  }

  private rateMetric(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    switch (name) {
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      case 'INP':
      case 'FID':
        return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
      default:
        return 'good';
    }
  }

  private formatMetricValue(name: string, value: number): string {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  }

  private handleVitalsMetric(metric: { name: string; value: number; delta?: number; id?: string }) {
    const name = metric.name as PerformanceMetric['name'];
    const rating = this.rateMetric(name, metric.value);
    const formatted = this.formatMetricValue(name, metric.value);

    this.metrics[name] = {
      name,
      value: metric.value,
      rating,
      formatted,
      delta: metric.delta,
      id: metric.id,
      timestamp: Date.now(),
    };

    this.notify();

    // Subtle dev console logging for performance debugging
    if (import.meta.env?.DEV) {
      console.debug(
        `%c[PWA Performance] %c${name}: %c${formatted} (${rating})`,
        'color: #c5a059; font-weight: bold',
        'color: #072614; font-weight: bold',
        rating === 'good' ? 'color: #10b981' : rating === 'needs-improvement' ? 'color: #f59e0b' : 'color: #ef4444'
      );
    }
  }

  private initWebVitals() {
    try {
      onLCP((m) => this.handleVitalsMetric(m));
      onCLS((m) => this.handleVitalsMetric(m));
      onFCP((m) => this.handleVitalsMetric(m));
      onTTFB((m) => this.handleVitalsMetric(m));
      onINP((m) => this.handleVitalsMetric(m));
    } catch (e) {
      console.warn('Web Vitals initialization warning:', e);
    }
  }

  private initNavigationTimings() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfNav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (perfNav) {
          this.system.pageLoadTimeMs = Math.round(perfNav.loadEventEnd - perfNav.startTime);
          this.system.domReadyTimeMs = Math.round(perfNav.domContentLoadedEventEnd - perfNav.startTime);
          if (!this.metrics['TTFB'] && perfNav.responseStart) {
            const ttfbVal = Math.round(perfNav.responseStart - perfNav.requestStart);
            this.handleVitalsMetric({
              name: 'TTFB',
              value: Math.max(0, ttfbVal),
            });
          }
        }
        this.updateMemory();
        this.notify();
      }, 500);
    });
  }

  private initNetworkInfo() {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
      if (conn) {
        this.system.networkType = conn.effectiveType;
        this.system.downlinkSpeed = conn.downlink;
        this.system.roundTripTime = conn.rtt;
      }
    }
  }

  private initServiceWorkerCheck() {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          this.system.serviceWorkerActive = true;
          this.notify();
        })
        .catch(() => {
          this.system.serviceWorkerActive = false;
        });
    }
  }

  private updateMemory() {
    if (typeof performance !== 'undefined' && (performance as unknown as { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory) {
      const mem = (performance as unknown as { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      this.system.memoryUsageMb = Math.round(mem.usedJSHeapSize / (1024 * 1024));
      this.system.memoryLimitMb = Math.round(mem.jsHeapSizeLimit / (1024 * 1024));
    }
  }

  private startFPSMonitor() {
    if (this.isMonitoringFPS || typeof window === 'undefined') return;
    this.isMonitoringFPS = true;

    const measureFPS = () => {
      this.frameCount++;
      const now = performance.now();
      const elapsed = now - this.lastFpsTimestamp;

      if (elapsed >= 1000) {
        this.system.fps = Math.min(60, Math.round((this.frameCount * 1000) / elapsed));
        this.frameCount = 0;
        this.lastFpsTimestamp = now;
        this.updateMemory();
        this.notify();
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  public subscribe(listener: MetricListener): () => void {
    this.listeners.add(listener);
    listener(this.metrics, this.system);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener({ ...this.metrics }, { ...this.system });
      } catch (e) {
        console.error('Error in performance metric listener:', e);
      }
    });
  }

  public getSnapshot() {
    return {
      metrics: { ...this.metrics },
      system: { ...this.system },
    };
  }
}

export const performanceTracker = new PerformanceTrackerService();
