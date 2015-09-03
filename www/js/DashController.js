
angular.module('app.controllers.DashController', [
  'app.services.DashService'
])
  .controller('DashController', function ($scope, DashService, $timeout, $ionicLoading) {

    $scope.incomesGroups = [];

    $ionicLoading.show({
      content: 'Loading data...',
      showBackdrop: false
    });

    $timeout(function () {
      // Initial database
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
    }, 100);

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

  });
