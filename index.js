import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { yDocToProsemirrorJSON, ySyncPlugin } from 'y-prosemirror';
import * as Y from 'yjs';

// Yjs updates that lead to a document with text "Hello world"
const YJS_UPDATES_BASE64 = [
	'AQKq6f+HBQAHAQtwcm9zZW1pcnJvcgMJcGFyYWdyYXBoKACq6f+HBQAFc3R5bGUBdwAA',
	'AQTS2Mv8DAAoAKrp/4cFAApub2RlSW5kZW50AX0AKACq6f+HBQARbm9kZVRleHRBbGlnbm1lbnQBdwAHAKrp/4cFAAYEANLYy/wMAgtIZWxsbyB3b3JsZAA=',
];

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	// Populate Yjs doc
	const yDoc = new Y.Doc();
	YJS_UPDATES_BASE64.forEach(update => {
		const encodedUpdate = Buffer.from(update, 'base64');
		Y.applyUpdate(yDoc, encodedUpdate);
	});

	// Build Prosemirror state based on Yjs doc
	const editorState = EditorState.create({
		schema,
		plugins: [ySyncPlugin(yDoc.getXmlFragment('prosemirror'))],
	});

	// Kevin had pointed out that it might take a bit until Prosemirror is populated from the Yjs document
	// 100ms should put us on the very safe side here
	// @see https://discuss.yjs.dev/t/create-yjs-prosemirror-updates-programmatically/1111/6?u=roro
	await sleep(100);

	// Check Yjs vs Prosemirror state
	console.log(`YJS: ${JSON.stringify(yDocToProsemirrorJSON(yDoc))}`);
	console.log(`PM:  ${JSON.stringify(editorState.doc.toJSON())}`);
}

main();
