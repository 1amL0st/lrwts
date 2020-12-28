/*
	I also use "PKief.material-icon-theme" icons
*/

import * as vscode from 'vscode';
import { initSettings } from './settings';
import { Controllers } from './controllers';

export function activate(context: vscode.ExtensionContext) {
	initSettings();
	new Controllers(context);

	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		'lrwts.deleteLeft', () => {
			const editor = Controllers.editors_clr.active;
			if (editor) {
				editor.isSelection = false;
			}
			vscode.commands.executeCommand('deleteLeft')
		}
	))
}

export function deactivate() {}
