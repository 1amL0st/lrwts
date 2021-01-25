import * as vscode from 'vscode';
import { syncSettings } from './settings';
import { Controllers } from './controllers';

async function onActivateSync(context: vscode.ExtensionContext) {
  const key = 'lrwtsSettingsSyncKey';

  const synchronized = 'Synchronized!';
  const value = context.globalState.get(key);

  if (!value || value !== synchronized) {
    syncSettings(context);
    context.globalState.update(key, synchronized);
  }
}

export function activate(context: vscode.ExtensionContext) {
  new Controllers(context);
  onActivateSync(context);
  context.subscriptions.push(vscode.commands.registerCommand('lrwts.syncSettings', syncSettings));
}

export function deactivate() {}
