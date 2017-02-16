declare var angularstats: angularstats.IAngularStats;

export = angularstats;

declare namespace angularstats {

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