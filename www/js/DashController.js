
angular.module('app.controllers.DashController', [
  'app.services.DashService'
])
  .controller('DashController', function ($scope, $ionicPlatform, DashService, $timeout, $ionicLoading) {

    $scope.incomesGroups = [];

    $ionicLoading.show({
      content: 'Loading data...',
      showBackdrop: false
    });

    $ionicPlatform.ready(function () {

      DashService.getIncomeGroup()
        .then(function (res) {

          for (var i = 0; i <= res.rows.length - 1; i++) {
            var obj = {};
            obj.id = res.rows.item(i).id;
            obj.name = res.rows.item(i).name;

            $scope.incomesGroups.push(obj);

            //console.log(JSON.stringify(res.rows.item(0)));
          }

          return DashService.getChartData();

        })
        .then(function (res) {

          $scope.data = [];
          $scope.labels = [];

          for (var i = 0; i <= res.rows.length - 1; i++) {

            $scope.data.push(res.rows.item(i).total);
            $scope.labels.push(res.rows.item(i).name);

          }

          $ionicLoading.hide();

        }, function (err) {
          $ionicLoading.hide();
          console.log(JSON.stringify(err));
        });

      // View event
      $scope.$on('$ionicView.afterEnter', function(){
        DashService.getChartData()
          .then(function (res) {

            $scope.data = [];
            $scope.labels = [];

            for (var i = 0; i <= res.rows.length - 1; i++) {

              $scope.data.push(res.rows.item(i).total);
              $scope.labels.push(res.rows.item(i).name);

            }

            $ionicLoading.hide();

          }, function (err) {
            $ionicLoading.hide();
            console.log(JSON.stringify(err));
          });
      });

    });

  });
