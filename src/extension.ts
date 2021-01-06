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

async function lostTry(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    let text = document.getText();
    text = "Hello" + text;
  }
}

export function activate(context: vscode.ExtensionContext) {
  lostTry(context);
	new Controllers(context);
	onActivateSync(context);
	context.subscriptions.push(vscode.commands.registerCommand('lrwts.syncSettings', syncSettings));
}

export function deactivate() {}
