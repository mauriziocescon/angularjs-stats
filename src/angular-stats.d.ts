/// <reference types="angular" />

import * as angular from "angular";

declare module "angular" {

	export interface IAngularStats {
		/**
		 * Set the element from where the
		 * analysis will start
		 *
		 * @param element
		 */
		setStartingElement(element: any): void;
		/**
		 * Count the number of scopes / watchers
		 * for every component. Analyze the DOM
		 */
		analyzeWebApp: () => string;
	}
}