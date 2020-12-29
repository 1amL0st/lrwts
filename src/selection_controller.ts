import * as vscode from 'vscode';
import { Controllers } from './controllers';

export class SelectionController {
	constructor(context: vscode.ExtensionContext) {
		context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.cancelSelection', this.cancelSelection.bind(this)));
		context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.setSelectionMark', this.setSelectionMark.bind(this)));
	}

	async cancelSelection() {
		const editor = Controllers.editors_clr.active;
		if (editor) {
			editor.isSelection = false;
			vscode.commands.executeCommand('cancelSelection');
		}
	}

	async setSelectionMark() {
		const editor = Controllers.editors_clr.active;
		if (editor) {
			editor.isSelection = true;
			const e = editor.vscodeEditor;
			e.selection = new vscode.Selection(e.selection.active.with(), e.selection.active.with());
		}
	}

	async update() {
		const editor = Controllers.editors_clr.active;
		if (editor && editor?.isSelection) {
			// const selection = Controllers.editors_clr.active?.vscodeEditor.selection;
		}
	}
}