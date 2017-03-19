/// <reference types="angular" />

export = mc;

declare namespace mc {

	interface IAngularStats {
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