import * as vscode from 'vscode';

import { CursorController } from './cursor_controller';
import { SelectionController } from './selection_controller';
import { EditorsControllers } from './editors_controllers';

export class Controllers {
	static selection_clr: SelectionController;
	static cursor_clr: CursorController;
	static editors_clr: EditorsControllers;	

	constructor(context: vscode.ExtensionContext) {
		Controllers.selection_clr = new SelectionController(context);
		Controllers.cursor_clr = new CursorController(context);
	  Controllers.editors_clr = new EditorsControllers(context);
	}
}