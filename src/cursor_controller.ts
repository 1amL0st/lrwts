import * as vscode from 'vscode';
import { Controllers } from './controllers';

export class CursorController {
	constructor(context: vscode.ExtensionContext) {
    const commands = new Set<string>([
      'lrwts.cursorUp',
      'lrwts.cursorDown',
      'lrwts.cursorRight',
      'lrwts.cursorLeft',
      'lrwts.cursorLineEnd',
      'lrwts.cursorWordRight',
			'lrwts.cursorWordLeft',
			'lrwts.cursorPageDown',
			'lrwts.cursorPageUp',
    ]);

    commands.forEach((command) => {
      const cmd =  command.substr(command.indexOf('.') + 1);
      context.subscriptions.push(vscode.commands.registerTextEditorCommand(
        command, () => {
          this.moveCursor(cmd)
        }
      ))
		});
		
		vscode.commands.registerTextEditorCommand('lrwts.cursorLineStart', this.cursorLineStart.bind(this));
	}

	async cursorLineStart() {
		if (!vscode.window.activeTextEditor) {
			return;
		}

		let document = vscode.window.activeTextEditor.document;

		let pos = vscode.window.activeTextEditor?.selection.active;
		if (pos) {
			pos = pos.with(pos.line, 0);

			let range = new vscode.Range(pos, pos.with(pos.line, pos.character + 1));
			while (document.validateRange(range))
			{
				let symbol = document.getText(range);
				if (symbol != ' ' && symbol != '\t') {
					break;
				}
				else {
					range = range.with(range.end, range.end.with(range.end.line, range.end.character + 1));
				}
			}
			
			const editor = vscode.window.activeTextEditor;
			let selection_start = new vscode.Position(editor.selection.anchor.line, editor.selection.anchor.character);
			let selection_end = new vscode.Position(range.end.line, range.end.character - 1);

			if (!Controllers.editors_clr.active?.isSelection) {
				selection_start = selection_end;
			}

			editor.selection = new vscode.Selection(
				selection_start,
				selection_end
			);
		}
	}

	async moveCursor(command: string) {
		if (Controllers.editors_clr.active?.isSelection) {
			command += 'Select';
		}
		await vscode.commands.executeCommand(command).then(() => {
      // Controllers.selection_clr.update();
		});
	}
}