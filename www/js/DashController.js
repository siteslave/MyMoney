
angular.module('app.controllers.DashController', [
  'app.services.DashService'
])
  .controller('DashController', function ($scope, DashService, $ionicPlatform, $cordovaSQLite) {

    $scope.incomesGroups = [];

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
      }, function (err) {
        console.log(err);
      });

    //$scope.incomesGroups = [
    //  {id: 1, name: 'ค่าน้ำ'},
    //  {id: 2, name: 'ค่าไฟ'},
    //  {id: 3, name: 'ค่ารถ'}
    //];

  });
