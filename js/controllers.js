    // Nom du 

    angular.module('specflowApp.controllers', ['ui.bootstrap'])
    .controller('ListeFeatureCtrl', ['Fonctionnalites', 'Menu', '$scope', '$window', '$log', 'filterFilter', 'Breadcrumb', '$modal',

        function(Fonctionnalites, Menu, $scope, $win, $log, filterFilter, Breadcrumb, $modal) {

                //$scope.MenuItems = [];

                $scope.Menu_handler = function(branch) {
                    Menu.RedirectToFeature(branch);
                }

                $scope.OuvrirAbout = function() {
                    $modal.open({
                        templateUrl: 'modal.html'
                    });
                };

                $scope.selectionnerUneFeature = function($item, $model, $label)
                {
                    window.location = '#/Documentation/' + $model;
                }

                $scope.MenuItems = [{
                    label: 'Chargement'
                }]

                // $scope.$watch('query', function() {
                //     $log.info($scope.query);
                //     $scope.MenuItems = Menu.Build($scope.features, $scope.query);
                // });

    Fonctionnalites.RecupererLesFeatures().then(function(data) {
        $scope.features = data;
        $scope.featureByName = Fonctionnalites.GenererLeTableauParName($scope.features);
        $scope.MenuItems = Menu.Build($scope.features);
    });

    $scope.filterOnSelect = "onTitle";
    $scope.Ariane = Breadcrumb.SetBreadcrumb([]);
}
])
    .controller('DetailFeatureCtrl', ['$scope', '$http', '$routeParams', '$window', 'filterFilter', 'Fonctionnalites', 'Breadcrumb',
        function($scope, $http, $routeParams, $win, filterFilter, Fonctionnalites, Breadcrumb) {

            $scope.status = {
                openAll: false,
                open:false
            };

            if($scope.features == null)
            {
                Fonctionnalites.RecupererLesFeatures().then(function(data) {
                    $scope.features = data;
                    $scope.featureByName = Fonctionnalites.GenererLeTableauParName($scope.features);
                });
            }
            RecupererLeFeature();

            function RecupererLeFeature()
            {
               var index = 0;
               angular.forEach($scope.featureByName, function(feature) {
                if (feature == $routeParams.featureName) {
                    $scope.feature = $scope.features[index];
                    Breadcrumb.SetBreadcrumb($scope.feature.RelativeFolder.split("\\"));
                }
                index++;
            });
           }
       }
       ]);