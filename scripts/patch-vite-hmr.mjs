import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function patchViteClientFiles() {
  const targets = [
    path.join(rootDir, 'node_modules/vite/dist/client/client.mjs'),
    path.join(rootDir, 'node_modules/vite/dist/client/bundledDevClient.mjs')
  ];

  for (const filePath of targets) {
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Replace throw e with graceful return in catch block
    if (content.includes('throw e;')) {
      content = content.replaceAll('throw e;', '/* HMR disabled in AI Studio */ return;');
      changed = true;
    }

    // 2. Neutralize createWebSocketModuleRunnerTransport so it never tries to open a WebSocket
    const startIdx = content.indexOf('const createWebSocketModuleRunnerTransport =');
    const endIdx = content.indexOf('//#region src/shared/pretty-format.ts');
    if (startIdx !== -1 && endIdx !== -1) {
      const safeTransport = `const createWebSocketModuleRunnerTransport = () => ({
\tasync connect({ onMessage }) {
\t\tonMessage?.({
\t\t\ttype: "custom",
\t\t\tevent: "vite:ws:connect",
\t\t\tdata: { webSocket: { readyState: 1, send() {}, close() {} } }
\t\t});
\t},
\tdisconnect() {},
\tsend() {}
});
//#endregion
`;
      const currentBlock = content.slice(startIdx, endIdx);
      if (!currentBlock.includes('webSocket: { readyState: 1')) {
        content = content.slice(0, startIdx) + safeTransport + content.slice(endIdx);
        changed = true;
      }
    }

    // 3. In bundledDevClient or elsewhere, eliminate "WebSocket closed without opened." rejection
    if (content.includes('reject(/* @__PURE__ */ new Error("WebSocket closed without opened."))')) {
      content = content.replaceAll(
        'reject(/* @__PURE__ */ new Error("WebSocket closed without opened."))',
        'resolve()'
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch-vite-hmr] Successfully patched: ${path.relative(rootDir, filePath)}`);
    }
  }
}

// Run immediately if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  patchViteClientFiles();
}
