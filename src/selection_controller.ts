import * as vscode from 'vscode';

import { Utility, TextCommandData } from './utility';
import { Controllers } from './controllers';

export class SelectionController {
	constructor(context: vscode.ExtensionContext) {
		Utility.registerTextCommands(context, [
			new TextCommandData('lrwts.cancelSelection', this.cancelSelection.bind(this)),
			new TextCommandData('lrwts.setSelectionMark', this.setSelectionMark.bind(this)),
			new TextCommandData('lrwts.selectBetweenQuotes', this.selectBetweenQuotes.bind(this)),
			new TextCommandData('lrwts.addSelectionToNextFindMatch', this.addSelectionToNextFindMatch.bind(this))
		])
	}

	async selectBetweenQuotes() {
		let leftPos = Utility.findLeftQuoteFromCursorPos("\'\"", true);
		let rightPos = Utility.findRightQuoteFromCursorPos("\'\"", true);
		if (leftPos && rightPos) {
			this.selectRangeInActiveTextDocument(new vscode.Range(new vscode.Position(leftPos.line, leftPos.character - 1), rightPos));
		}
	}

	async selectRangeInActiveTextDocument(range: vscode.Range) {
		let editor = vscode.window.activeTextEditor;
		let editorEntry = Controllers.editors_clr.active;
		if (editor && editorEntry) {
			editorEntry.isSelection = true;
			editor.selection = new vscode.Selection(range.start, range.end);
		}
	}

	async addSelectionToNextFindMatch() {
		await this.setSelectionMark();
		await vscode.commands.executeCommand('editor.action.addSelectionToNextFindMatch');
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
}