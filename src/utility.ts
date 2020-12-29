import * as vscode from 'vscode';

export class TextCommandData {
  name: string;
  callback: any;

  constructor(name: string, callback: any) {
    this.name = name;
    this.callback = callback;
  }
};

export class Utility {
  static registerTextCommand(context: vscode.ExtensionContext, name: string, callback: any) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand(name, callback));
  }

  static registerTextCommands(context: vscode.ExtensionContext, commands: Array<TextCommandData>) {
    commands.forEach((command) => Utility.registerTextCommand(context, command.name, command.callback));
  }
}