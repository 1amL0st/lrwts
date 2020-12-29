import * as vscode from 'vscode';
import { Controllers } from './controllers';

export class EditController {
  constructor(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardCutAction', this.clipboardCutAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardPasteAction', this.clipboardPasteAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardCopyAction', this.clipboardCopyAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.deleteLeft', this.deleteLeft.bind(this)));
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