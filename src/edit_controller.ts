import * as vscode from 'vscode';
import { Controllers } from './controllers';

export class EditController {
  constructor(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardCutAction', this.clipboardCutAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardPasteAction', this.clipboardPasteAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.clipboardCopyAction', this.clipboardCopyAction.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.deleteLeft', this.deleteLeft.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.replaceInSelection', this.replaceinSelection.bind(this)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('lrwts.rectangleTest', this.rectangeTest.bind(this)));
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

  async rectangeTest() {
    console.log('Rectangle test!');
    const decorationType = vscode.window.createTextEditorDecorationType({
      // borderWidth: '1px',
      // borderStyle: 'solid',
      backgroundColor: 'red',
      // overviewRulerColor: 'blue',
      // overviewRulerLane: vscode.OverviewRulerLane.Right,
      // light: {
      //   // this color will be used in light color themes
      //   borderColor: 'darkblue'
      // },
      // dark: {
      //   // this color will be used in dark color themes
      //   borderColor: 'lightblue'
      // }
    });

    const editor = Controllers.editors_clr.active;
    if (editor) {
      let ranges = new Array<vscode.Range>();
      ranges.push(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 5)))
      editor.vscodeEditor.setDecorations(decorationType, ranges);
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