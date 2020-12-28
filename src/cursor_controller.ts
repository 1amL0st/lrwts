import * as vscode from 'vscode';
import { Controllers } from './controllers';

export class CursorController {
	constructor(context: vscode.ExtensionContext) {
    const commands = new Set<string>([
      'lrwts.cursorUp',
      'lrwts.cursorDown',
      'lrwts.cursorRight',
      'lrwts.cursorLeft',
      'lrwts.cursorLineStart',
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
	}

	async moveCursor(command: string) {
		if (Controllers.editors_clr.active?.isSelection) {
			command += 'Select';
		}
		await vscode.commands.executeCommand(command).then(() => {
      console.log('Cursor is moved!');
		}).then(() => Controllers.selection_clr.update());
	}
}