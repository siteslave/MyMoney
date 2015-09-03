
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

          for(var i = 0; i <= res.rows.length - 1; i++) {
            var obj = {};
            obj.id = res.rows.item(i).id;
            obj.name = res.rows.item(i).name;

            $scope.incomesGroups.push(obj);

            //console.log(JSON.stringify(res.rows.item(0)));
          }

          $ionicLoading.hide();

        }, function (err) {
          console.log(err);
          $ionicLoading.hide();
        });
    });

  });
