import * as vscode from 'vscode';
import { ExtensionContext, Range, Position, Selection } from 'vscode';
import { Controllers } from './controllers';

import { Utility, TextCommandData } from './utility';

export class EditController {
  constructor(context: ExtensionContext) {
    Utility.registerTextCommands(context, [
			new TextCommandData('lrwts.clipboardCutAction', this.clipboardCutAction.bind(this)),
			new TextCommandData('lrwts.clipboardPasteAction', this.clipboardPasteAction.bind(this)),
			new TextCommandData('lrwts.clipboardCopyAction', this.clipboardCopyAction.bind(this)),
			new TextCommandData('lrwts.deleteLeft', this.deleteLeft.bind(this)),
      new TextCommandData('lrwts.replaceInSelection', this.replaceinSelection.bind(this)),
      new TextCommandData('lrwts.deleteSelectionRectangle', this.deleteSelectionRectangle.bind(this)),
      new TextCommandData('lrwts.replaceSelectionRectangle', this.replaceSelectionRectangle.bind(this)),
      new TextCommandData('lrwts.insertSelectionRectangle', this.insertSelectionRectangle.bind(this)),
		]);
  }

  async insertSelectionRectangle() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const [startLine, endLine, startChar, endChar] = Utility.getSelectionRectangleMetrics(editor);
      await Controllers.selection_clr.cancelSelection();

      let selections = new Array<Selection>();
      for (let i = startLine; i <= endLine; ++i) {
        let line_text = editor.document.getText(new Range(new Position(i, startChar), new Position(i, endChar)));
        if (line_text != "") {
          selections.push(new Selection(
            new Position(i, startChar),
            new Position(i, startChar + 1)
          ));
        }
      }

      editor.selections = selections;
    }
  }

  async replaceSelectionRectangle() {
    // const editor = Controllers.editors_clr.active?.vscodeEditor;
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const strToReplace = await vscode.window.showInputBox({
        placeHolder: 'Enter text to replace',
      });
      if (strToReplace) {
        const [startLine, endLine, startChar, endChar] = Utility.getSelectionRectangleMetrics(editor);
        editor.edit(editorBuilder => {
          for (let i = startLine; i <= endLine; ++i) {
            const range = new Range(new Position(i, startChar), new Position(i, endChar));
            if (editor.document.getText(range) != "") {
              editorBuilder.replace(range, strToReplace);
            }
          }
        });
      }
    }
  }

  async deleteSelectionRectangle() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const [startLine, endLine, startChar, endChar] = Utility.getSelectionRectangleMetrics(editor);
      editor.edit(editorBuilder => {
        for (let i = startLine; i <= endLine; ++i) {
          const range = new Range(new Position(i, startChar), new Position(i, endChar));
          editorBuilder.delete(range);
        }
      });
    }
  }

  async replaceinSelection() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const target = await vscode.window.showInputBox({
        placeHolder: 'Enter target',
      });

      const source = await vscode.window.showInputBox({
        placeHolder: 'Enter source'
      });

      if (target && source) {
        const text = editor.document.getText(editor.selection);
        // const regExp = new RegExp(target, 'g');
        // text.replaceAll()
        // const newText = text.replace(regExp, source);
        // TODO: This algorithm might be slow...
        const newText = text.split(target).join(source);
        editor.edit(editBuilder => {
          editBuilder.replace(editor.selection, newText)
        });
      }
    }
  }

  async deleteLeft() {
    const editor = Controllers.editors_clr.active;
    if (editor) {
      editor.isSelection = false;
    }
    vscode.commands.executeCommand('deleteLeft');
    // TODO: This can cause bugs...
    // Controllers.selection_clr.cancelSelection();
  }

  async clipboardCopyAction() {
    vscode.commands.executeCommand('editor.action.clipboardCopyAction');
    Controllers.selection_clr.cancelSelection();
  }

  async clipboardPasteAction() {
    vscode.commands.executeCommand('editor.action.clipboardPasteAction');
    Controllers.selection_clr.cancelSelection();
  }

  async clipboardCutAction() {
    await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
    await vscode.commands.executeCommand('deleteLeft');
    Controllers.selection_clr.cancelSelection();
  }
}