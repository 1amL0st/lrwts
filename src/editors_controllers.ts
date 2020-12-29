import * as vscode from 'vscode';

export class EditorEntry {
	vscodeEditor: vscode.TextEditor;
	isSelection: boolean;

	constructor(vscodeEditor: vscode.TextEditor) {
		this.vscodeEditor = vscodeEditor;
		this.isSelection = false;
	}
}

export class EditorsControllers {
	editors: Array<EditorEntry>;
	active: EditorEntry | null;

	constructor(context: vscode.ExtensionContext) {
		this.editors = new Array();
		this.active = null;

		if (vscode.window.activeTextEditor) {
			const entry = new EditorEntry(vscode.window.activeTextEditor);
			this.active = entry;
			this.editors.push(entry);
		}

		vscode.window.onDidChangeActiveTextEditor((editor) => {
			console.log('onDidChangeActiveTextEditor, editor = ', editor);
			if (editor) {
				this.addNewEditor(editor);
			}
		});

		context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.closeActiveEditor', async (editor) => {
			if (editor) {
				this.removeEditor(editor);
				vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			}
		}));
	}

	findEditor(editor: vscode.TextEditor): number {
		return this.editors.findIndex((entry) => {
			return editor.document.uri === entry.vscodeEditor.document.uri;
		});
	}

	removeEditor(editor: vscode.TextEditor) {
		const index = this.findEditor(editor);
		if (index !== -1) {
			this.editors.splice(index, 1);
		}
	}

	addNewEditor(editor: vscode.TextEditor) {
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