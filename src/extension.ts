import * as vscode from 'vscode';
import { syncSettings } from './settings';
import { Controllers } from './controllers';

async function onActivateSync(context: vscode.ExtensionContext) {
  const key = 'lrwtsSettingsSyncKey';
  if (context.globalState.get(key)) {
	  syncSettings(context);
    context.globalState.update(key, 'Synchronized!');
  }
}

export function activate(context: vscode.ExtensionContext) {
	new Controllers(context);
	onActivateSync(context);
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.syncSettings', syncSettings));
}

export function deactivate() {}
