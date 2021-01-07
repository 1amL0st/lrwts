import * as vscode from 'vscode';

function setSettingsFromObject(settings: any) {
  for (const setting in settings) {
		vscode.workspace.getConfiguration().update(setting, settings[setting], vscode.ConfigurationTarget.Global);
	}
}

async function setStandartVSCodeSettings() {
  // LostRay: Maybe i should split this object...
  const settings: any = {
    "bookmarks.multicursor.toggleMode": "allLinesAtOnce",

    "window.zoomLevel": 0,

    "workbench.colorCustomizations": {
      "bookmarks.lineBackground": "#660033AA",
      "editorCursor.foreground": "#00FF00",
      "editorCursor.background": "#000000",
      "terminalCursor.foreground": "#FFFFFF",
      
      "debugIcon.breakpointForeground": "#ff0000",
      "editor.lineHighlightBackground": "#0a5f002a",
      "debugIcon.breakpointDisabledForeground": "#ff0000",
      "editor.selectionHighlightBackground": "#113355",
      "editor.selectionBackground": "#005555",
    },

    "editor.tokenColorCustomizations": {
      "comments": "#ecff3e"
    },
    "editor.renderWhitespace": "all",
    "editor.tabSize": 2,
    "editor.cursorBlinking": "solid",
    "editor.cursorStyle": "block",
    "editor.fontSize": 14,
    "editor.fontFamily": "Comic Mono",
    "editor.minimap.enabled": false,
    "editor.hideCursorInOverviewRuler": true,
    // NOTE: These two settings looks useless
    "editor.scrollbar.horizontal": "hidden",
    "editor.scrollbar.vertical": "hidden",
    // "editor.lineNumbers": "off",
    // "editor.glyphMargin": false,
    "editor.wordWrap": "on",
    
    "breadcrumbs.enabled": true,

    "workbench.activityBar.visible": true,
    "workbench.sideBar.location": "right",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.colorTheme": "One Dark Pro",

    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",

    "todohighlight.keywords": [
      {
          "text": "NOTE:",
          "color": "#fcb358",
          "backgroundColor": "rgba(0, 0, 0, 0)",
          "overviewRulerColor": "grey"
      },
      {
          "text": "LostRay:",
          "color": "#9fff94",
          "backgroundColor": "rgba(0, 0, 0, 0)",
          "isWholeLine": false,
      },
      {
          "text": "FIXME:",
          "color": "#ff1414",
          "backgroundColor": "rgba(0, 0, 0, 0)"
      },
      {
          "text": "TODO:",
          "color": "#ca75ff",
          "backgroundColor": "rgba(0, 0, 0, 0)"
      },
    ],
    "todohighlight.defaultStyle": {
        "color": "#ff8c75",
        "backgroundColor": "rgba(0, 0, 0, 0)"
    },

    "rust-client.channel": "nightly",
    "rust-analyzer.callInfo.full": false,
    "rust-analyzer.inlayHints.chainingHints": false,
    "rust-analyzer.inlayHints.typeHints": false,
    "rust-analyzer.inlayHints.parameterHints": false
  };
  setSettingsFromObject(settings);
}

export function syncSettings(context: vscode.ExtensionContext): void {
  setStandartVSCodeSettings();
}