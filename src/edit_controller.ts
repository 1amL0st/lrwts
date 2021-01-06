import * as vscode from 'vscode';
import { ExtensionContext, Range, Position } from 'vscode';
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
      new TextCommandData('lrwts.removeSelectionRectangle', this.removeSelectionRectangle.bind(this))
		]);
  }

  async removeSelectionRectangle() {
    const editor = Controllers.editors_clr.active?.vscodeEditor;
    if (editor) {
      const [startLine, endLine, startChar, endChar] = Utility.getSelectionRectangleMetrics(editor);
      editor.edit(editorBuilder => {
        for (let i = startLine; i <= endLine; ++i) {
          const range = new Range(new Position(i, startChar), new Position(i, endChar));
          editorBuilder.delete(range);
        }
      })
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
    vscode.commands.executeCommand('deleteLeft')
    Controllers.selection_clr.cancelSelection();
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