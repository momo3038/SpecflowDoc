'use strict';
// angular.module
// D�claration de l'application "specflowApp". Voir directive ng-app dans index.html
// Ajouter des d�pendances de l'application. Par exemple, un module peut �tre d�pendant d'un autre. L'injection de d�pendance permet de d�coupler les modules.
// Ici, Index.html r�f�rence le module specflowAp. C'est donc ce module qui sera maitre. L'un des module inject� est celui des controller, d�fini dans le fichier controller.

// Module.Config
// $routeProvider : injecte le fournisseur de routes puis le configure.
// when : Lorsqu'une URL matche (Utiliser :Name pour des variables). Founir la page html et le controlleur qui va g�rer cette partie de page.
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