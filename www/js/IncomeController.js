
angular.module('starter.controllers.IncomeController', [])
  .controller('IncomeController', function ($scope, $state,
                                            $stateParams, IncomeService) {

    $scope.data = {};

    $scope.data.incomeGroupId = $stateParams.id;


    $scope.save = function () {
      //alert(JSON.stringify($scope.data));

      IncomeService.save($scope.data)
        .then(function (res) {
          var id = res.insertId;
          $scope.items.push({
            id: id,
            desc: $scope.data.desc,
            price: $scope.data.price
          });
          //console.log(JSON.stringify(res));
          //$scope.getAll();
        }, function (err) {
          alert(JSON.stringify(err));
        });

    };

    $scope.items = [];

    $scope.getAll = function () {
      $scope.items = [];
      IncomeService.getAll()
        .then(function (res) {

          for(var i = 0; i <= res.rows.length - 1; i++) {
            var obj = {};
            obj.id = res.rows.item(i).id;
            obj.desc = res.rows.item(i).desc;
            obj.price = res.rows.item(i).price;

            $scope.items.push(obj);
          }

        }, function (err) {

        });
    };

    $scope.goBack = function () {
      $state.go('tab.dash');
    };

    $scope.getAll();

  });
