import * as vscode from 'vscode';
import { TextEditor, ExtensionContext } from 'vscode';
import { Controllers } from './controllers';

import { Utility } from './utility';

export class EditorEntry {
	vscodeEditor: TextEditor;
	isSelection: boolean;

	constructor(vscodeEditor: TextEditor) {
		this.vscodeEditor = vscodeEditor;
		this.isSelection = false;
	}
}

export class EditorsControllers {
	editors: Array<EditorEntry>;
	active: EditorEntry | null;

	constructor(context: ExtensionContext) {
		this.editors = new Array();
		this.active = null;

		if (vscode.window.activeTextEditor) {
			const entry = new EditorEntry(vscode.window.activeTextEditor);
			this.active = entry;
			this.editors.push(entry);
		}

		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				this.addNewEditor(editor);
				// FIXME: Looks like unstable solution for selection highlight updating!
				setTimeout(() => Controllers.selection_clr.updateSelectionRectangleHighlight(), 100);
			}
		});

		Utility.registerTextCommand(context, 'lrwts.closeActiveEditor', async (editor: TextEditor) => {
			if (editor) {
				this.removeEditor(editor);
				vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			}
		});
	}

	findEditor(editor: TextEditor): number {
		return this.editors.findIndex((entry) => {
			return editor.document.uri === entry.vscodeEditor.document.uri;
		});
	}

	removeEditor(editor: TextEditor) {
		const index = this.findEditor(editor);
		if (index !== -1) {
			this.editors.splice(index, 1);
		}
	}

	addNewEditor(editor: TextEditor) {
		let index = this.findEditor(editor);
		if (index == -1) {
			let entry = new EditorEntry(editor);
			this.editors.push(entry);
			this.active = entry;
		} else {
			this.active = this.editors[index];
		}
	}
}