import * as vscode from 'vscode';
import { syncSettings } from './settings';
import { Controllers } from './controllers';

export function activate(context: vscode.ExtensionContext) {
	new Controllers(context);
	syncSettings(context);
	// context.subscriptions.push(vscode.commands.registerCommand('lrwts.syncSettings', syncSettings));
}

export function deactivate() {}
