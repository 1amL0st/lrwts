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
		// await this.cancelSelection();
		vscode.commands.executeCommand('editor.action.nextMatchFindAction', '"').then((result) => {
			console.log('Something is found!');
			console.log('Result = ', result);
		})
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