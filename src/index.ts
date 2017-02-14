import * as angular from "angular";
import {AngularStats} from "./angular-stats.service";

export const angularStats = angular.module("angularStats", [])
	.service("AngularStats", AngularStats)
	.name;