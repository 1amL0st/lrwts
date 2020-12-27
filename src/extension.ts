import * as vscode from 'vscode';

import { initSettings } from './settings';

export function activate(context: vscode.ExtensionContext) {
	initSettings();

	let disposable = vscode.commands.registerCommand('lrwts.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello this lost ray extension!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
