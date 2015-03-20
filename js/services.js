 'use strict';

 /* Services */
 var services = angular.module('specflowDocApp.services', []);

 services.factory('Fonctionnalites', ['$http', '$log', '$q',
 	function($http, $log, $q) {
 		$log.info("Début du chargement du fichier JSON");
 		var nomDuFichier = 'json/test.json';

 		return {
 			RecupererLesFeatures: function() {
 				var promise = $http.get(nomDuFichier, {
 						cache: true
 					})
 					.success(function(data, status) {
 						$log.info("Chargement du fichier " + nomDuFichier + " terminé avec succés (Status : " + status + ")")
 					})
 					.then(function(response) {
 						return response.data;
 					});

 				return promise;
 			},
 			RecupererFilAriane: function(feature) {
 				$log.info("Ariane : " + feature.RelativeFolder);
 				return feature.RelativeFolder;
 			},
 			GenererLeTableauParName: function(features){
 				var featuresByName = [];
 				angular.forEach(features, function(value, key) {
					featuresByName.push(value.Feature.Name);
 				});
 				return featuresByName;
 			}
 		}
 	}
 ]);

 services.factory('Menu', ['$window','$location',
 	function($win, $location) {

 		var AddItemToMenu = function(titre, titrePourUrl, avecUrl) {
 			if (avecUrl) {
 				return {
 					label: titrePourUrl,
 					children: [],
 					data: {
 						url: "/Documentation/" + titrePourUrl,
 						titreDuFichier: titre
 					}
 				};
 			} else {
 				return {
 					label: titre,
 					children: [],
 					data: {
 						titreDuFichier: titre
 					}
 				};
 			}
 		};

 		var ItemAlreadyAdded = function(array, itemValue) {
 			for (var i = array.length - 1; i >= 0; i--) {
 				if (array[i].data.titreDuFichier == itemValue)
 					return i;
 			};
 			return -1;
 		};

 		return {
 			RedirectToFeature: function(branch) {
 				var _ref;
 				if ((_ref = branch.data) != null ? _ref.url : void 0) {
 					//window.location = branch.data.url;
 					$location.path(branch.data.url);
 				}
 			},
 			Build: function(features, filtre) {
 				var treeRoot = [];
 				angular.forEach(features, function(value, key) {

 					var sectionspecflow = value.RelativeFolder.split("\\");

 					var array = treeRoot;

 					for (var i = 0; i <= sectionspecflow.length - 1; i++) {
 						var isAFature = (i == sectionspecflow.length - 1);
 						var element = AddItemToMenu(sectionspecflow[i], value.Feature.Name, isAFature);
 						if (ItemAlreadyAdded(array, sectionspecflow[i]) == -1) {
 							if (isAFature && filtre != null && element.label.indexOf(filtre) > -1) {
 								array.push(element);
 							} else if (filtre == null)
 								array.push(element);
 							array = element.children;
 						} else {
 							var index = ItemAlreadyAdded(array, sectionspecflow[i]);
 							array = array[index].children;
 						}
 					};
 				});
 				return treeRoot;
 			}
 		}
 	}
 ]);

 services.factory('Breadcrumb', ['$window',
 	function($win) {

 		var Breadcrumb = [];

 		return {
 			GetBreadcrumb: function() {
 				return Breadcrumb;
 			},
 			SetBreadcrumb: function(arrayExt) {
 				while (Breadcrumb.length > 0) {
 					Breadcrumb.pop();
 				}
 				angular.forEach(arrayExt, function(value, key) {
 					Breadcrumb.push(value);
 				});
 				return Breadcrumb;
 			}
 		}
 	}
 ]);