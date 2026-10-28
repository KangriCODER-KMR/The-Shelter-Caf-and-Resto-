import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalTouchAction = '';

/**
 * Custom hook to safely lock document body scrolling when a modal,
 * drawer, or overlay is open. Uses reference counting so nested or
 * transitioning modals do not prematurely restore scrolling.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      }
    };
  }, [isLocked]);
}
