'use strict';
// angular.module
// Déclaration de l'application "specflowApp". Voir directive ng-app dans index.html
// Ajouter des dépendances de l'application. Par exemple, un module peut être dépendant d'un autre. L'injection de dépendance permet de découpler les modules.
// Ici, Index.html référence le module specflowAp. C'est donc ce module qui sera maitre. L'un des module injecté est celui des controller, défini dans le fichier controller.

// Module.Config
// $routeProvider : injecte le fournisseur de routes puis le configure.
// when : Lorsqu'une URL matche (Utiliser :Name pour des variables). Founir la page html et le controlleur qui va gérer cette partie de page.
// otherwise : Sinon, on redirige.
var specflowApp = angular.module('specflowApp', ['ngRoute',
	'specflowApp.controllers',
	'specflowDocApp.directives',
	'specflowDocApp.services'
]);


specflowApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/Documentation/:featureName', {
				templateUrl: 'feature-detail.html',
				controller: 'DetailFeatureCtrl'
			}).
		when('/EcrireUneFeature', {
			templateUrl: 'EcrireFeature.html',
			controller: 'EcrireFeatureCtrl'
		}).
		otherwise({
			redirectTo: ''
		});
	}
]);