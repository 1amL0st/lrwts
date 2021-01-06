import * as vscode from 'vscode';

export type SelectionRectangleMetrics = [number, number, number, number];

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

  static findLeftQuoteFromCursorPos(symbols: String, include: boolean): vscode.Position | null {
    if (vscode.window.activeTextEditor) {
      let document = vscode.window.activeTextEditor.document;
      let pos = vscode.window.activeTextEditor.selection.active;

      if (!include) {
        pos = pos.with(pos.line, pos.character - 1);
      }

      let range = new vscode.Range(pos, pos.with(pos.line, pos.character + 1));
      while (document.validateRange(range))
		  {
        let symbol = document.getText(range);
        if (symbols.includes(symbol)) {
          return range.end;
        }
        else {
          let newPos = new vscode.Position(range.start.line, range.start.character - 1);
          range = new vscode.Range(newPos, range.start);
        }
		  }
		};
    return null;
  }

  static findRightQuoteFromCursorPos(symbols: String, include: boolean): vscode.Position | null {
    if (vscode.window.activeTextEditor) {
      let document = vscode.window.activeTextEditor.document;
      let pos = vscode.window.activeTextEditor.selection.active;

      if (!include) {
        pos = pos.with(pos.line, pos.character - 1);
      }

      let range = new vscode.Range(pos, pos.with(pos.line, pos.character + 1));
      while (document.validateRange(range))
		  {
        let symbol = document.getText(range);
        if (symbols.includes(symbol)) {
          return range.end;
        }
        else {
          let newPos = new vscode.Position(range.end.line, range.end.character + 1);
          range = new vscode.Range(range.end, newPos);
        }
		  }
		};
    return null;
  }

  /// Returns [startLine, endLine, startChar, endChar]
  static getSelectionRectangleMetrics(editor: vscode.TextEditor): SelectionRectangleMetrics {
    let selectionStart = editor.selection.start;
    let selectionEnd = editor.selection.end;

    const startLine = Math.min(selectionStart.line, selectionEnd.line);
    const endLine = Math.max(selectionStart.line, selectionEnd.line);

    const startChar = Math.min(selectionStart.character, selectionEnd.character);
    const endChar = Math.max(selectionStart.character, selectionEnd.character);

    return [startLine, endLine, startChar, endChar];
  }
}