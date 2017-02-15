declare var angularstats: angularstats.IAngularStats;

export = angularstats;

declare namespace angularstats {

	interface IAngularStats {
		/**
		 * Count the number of scopes / watchers
		 * for every component. Analyze the DOM
		 */
		analyzeWebApp: () => string;

		set startingElement: string;
	}
}