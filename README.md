# y-prosemirror-update
Repo to reproduce issue in creating yjs upates from Prosemirror transactions. This was initially discussed on the [Yjs Community forum](https://discuss.yjs.dev/t/create-yjs-prosemirror-updates-programmatically/1111).

---

To reproduce the issue:
1. Install dependencies:
   ```
   npm ci
   ```
2. Run demo to see that Yjs doc contains "Hello world" text but Prosemirror doc doesn't:
   ```
   $ npm run demo
   YJS: {"type":"doc","content":[{"type":"paragraph","attrs":{"style":"","nodeIndent":0,"nodeTextAlignment":""},"content":[{"type":"text","text":"Hello world"}]}]}
   PM:  {"type":"doc","content":[{"type":"paragraph"}]}
   ```
