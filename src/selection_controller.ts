import * as vscode from 'vscode';
import { Position, Range, Selection } from 'vscode';

import { Utility, TextCommandData } from './utility';
import { Controllers } from './controllers';

export class SelectionController {
	rectangleDecorator: vscode.TextEditorDecorationType | null;
	rectangleStyle: any

	constructor(context: vscode.ExtensionContext) {
		this.rectangleDecorator = null;

		const style = vscode.workspace.getConfiguration('lrwts');
		const backgroundColor = style.get('selectionRectangleStyle');
		this.rectangleStyle = (backgroundColor) ? backgroundColor : {
			"backgroundColor": "#9e4163"
		};

		Utility.registerTextCommands(context, [
			new TextCommandData('lrwts.cancelSelection', this.cancelSelection.bind(this)),
			new TextCommandData('lrwts.setSelectionMark', this.setSelectionMark.bind(this)),
			new TextCommandData('lrwts.selectBetweenQuotes', this.selectBetweenQuotes.bind(this)),
			new TextCommandData('lrwts.addSelectionToNextFindMatch', this.addSelectionToNextFindMatch.bind(this)),
			new TextCommandData('lrwts.setMultilineCursor', this.setMultilineCursors.bind(this))
		]);
	}

	async updateSelectionRectangleHighlight() {
    const editor = Controllers.editors_clr.active;
    if (editor) {
			if (!this.rectangleDecorator) {
				this.rectangleDecorator = vscode.window.createTextEditorDecorationType(this.rectangleStyle);
			}

			const [startLine, endLine, startChar, endChar] = 
				Utility.getSelectionRectangleMetrics(editor.vscodeEditor);

			let ranges = new Array<Range>(endLine - startLine + 1);
			for (let i = startLine; i <= endLine; ++i) {
				ranges[i - startLine] = new Range(new Position(i, startChar), new Position(i, endChar));
			}

      // ranges.push(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 5)))
      editor.vscodeEditor.setDecorations(this.rectangleDecorator, ranges);
    }
	}

	// TODO: This function doesn't do anything useful
	async setMultilineCursors() {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.selections.push(new Selection(new Position(0, 0), new Position(0, 1)));
			editor.selections.push(new Selection(new Position(1, 0), new Position(1, 1)));
		}
	}

	async selectBetweenQuotes() {
		let leftPos = Utility.findLeftQuoteFromCursorPos("\'\"", true);
		let rightPos = Utility.findRightQuoteFromCursorPos("\'\"", true);
		if (leftPos && rightPos) {
			this.selectRangeInActiveTextDocument(new Range(new Position(leftPos.line, leftPos.character - 1), rightPos));
			this.updateSelectionRectangleHighlight();
		}
	}

	async selectRangeInActiveTextDocument(range: vscode.Range) {
		let editor = vscode.window.activeTextEditor;
		let editorEntry = Controllers.editors_clr.active;
		if (editor && editorEntry) {
			editorEntry.isSelection = true;
			editor.selection = new vscode.Selection(range.start, range.end);
			this.updateSelectionRectangleHighlight();
		}
	}

	async addSelectionToNextFindMatch() {
		await this.setSelectionMark();
		await vscode.commands.executeCommand('editor.action.addSelectionToNextFindMatch');
		this.updateSelectionRectangleHighlight();
	}

	async cancelSelection() {
		const editor = Controllers.editors_clr.active;
		if (editor) {
			editor.isSelection = false;
			await vscode.commands.executeCommand('cancelSelection');
			this.updateSelectionRectangleHighlight()
		}
	}

	async setSelectionMark() {
		const editor = Controllers.editors_clr.active;
		if (editor) {
			editor.isSelection = true;
			const e = editor.vscodeEditor;
			e.selection = new Selection(e.selection.active.with(), e.selection.active.with());
		}
	}
}