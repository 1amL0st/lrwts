import * as vscode from 'vscode';
import { initSettings } from './settings';
import { Controllers } from './controllers';

export function activate(context: vscode.ExtensionContext) {
	initSettings();
	new Controllers(context);
}

export function deactivate() {}
