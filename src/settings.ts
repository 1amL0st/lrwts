import * as vscode from 'vscode';

function setSettingsFromObject(settings: any) {
  for (const setting in settings) {
		vscode.workspace.getConfiguration().update(setting, settings[setting], vscode.ConfigurationTarget.Global);
	}
}

async function setOneDarkProTheme() {
  const settings: any = {
    "workbench.colorTheme": "One Dark Pro",
  };

  setSettingsFromObject(settings);
}

async function setBookmarkExtension() {
  const settings: any = {
		"bookmarks.multicursor.toggleMode": "allLinesAtOnce",
  }
  setSettingsFromObject(settings);
}

async function setRustAnalyzerExtension() {
  const settings: any = {
		"rust-client.channel": "nightly",
		"rust-analyzer.callInfo.full": false,
		"rust-analyzer.inlayHints.chainingHints": false,
		"rust-analyzer.inlayHints.typeHints": false,
		"rust-analyzer.inlayHints.parameterHints": false
  }
  setSettingsFromObject(settings);
}

async function setExternalExtensionsSettings() {
  setOneDarkProTheme();
  setBookmarkExtension();
  setRustAnalyzerExtension();
}

async function setStandartVSCodeSettings() {
  const settings: any = {
    "window.zoomLevel": 0,
    "editor.cursorBlinking": "solid",
    "editor.cursorStyle": "block",
    "editor.fontSize": 14,
		"editor.fontFamily": "Comic Mono",
	
		"editor.minimap.enabled": false,
		"editor.hideCursorInOverviewRuler": true,
		"editor.scrollbar.horizontal": "hidden",
		"editor.scrollbar.vertical": "hidden",
	
		// "editor.lineNumbers": "off",
		"editor.glyphMargin": false,
	
    "editor.wordWrap": "on",
    
    "workbench.colorCustomizations": {
      "bookmarks.lineBackground": "#660033AA",
      "editorCursor.foreground": "#00FF00",
			"editorCursor.background": "#000000",
      "terminalCursor.foreground": "#FFFFFF",
      
      "debugIcon.breakpointForeground": "#ff0000",
			"editor.lineHighlightBackground": "#0a5f002a",
			"debugIcon.breakpointDisabledForeground": "#ff0000",
			"editor.selectionHighlightBackground": "#113355",
			"editor.selectionBackground": "#005555"
    },

    "editor.tokenColorCustomizations": {
			"comments": "#ecff3e"
    },
    
    "breadcrumbs.enabled": false,
		"editor.renderWhitespace": "all",
    "workbench.activityBar.visible": true,
    "editor.tabSize": 2,
    "workbench.sideBar.location": "right",
  };
  setSettingsFromObject(settings);
}

export function initSettings(): void {
  setStandartVSCodeSettings();
  setExternalExtensionsSettings();
}