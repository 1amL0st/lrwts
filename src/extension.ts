import * as vscode from 'vscode';

import { initSettings } from './settings';

/*
	I also use "PKief.material-icon-theme" icons
*/

async function moveCursor(command: string) {
	await vscode.commands.executeCommand(command);
}

async function cursorRight() {
	moveCursor('cursorRight');
}

async function cursorLeft() {
	moveCursor('cursorLeft');
}

async function cursorDown() {
	moveCursor('cursorDown');
}

async function cursorUp() {
	moveCursor('cursorUp');
}

async function cancelSelection() {
	vscode.commands.executeCommand('cancelSelection');
}

export function activate(context: vscode.ExtensionContext) {
	initSettings();

	context.subscriptions.push(vscode.commands.registerCommand('lrwts.cursorUp', cursorUp));
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.cursorDown', cursorDown));
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.cursorRight', cursorRight));
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.cursorLeft', cursorLeft));
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.cancelSelection', cancelSelection));

	let disposable = vscode.commands.registerCommand('lrwts.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello this lost ray extension!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
