
angular.module('app.controllers.DashController', [])
  .controller('DashController', function ($scope) {

    $scope.incomesGroups = [
      {id: 1, name: 'ค่าน้ำ'},
      {id: 2, name: 'ค่าไฟ'},
      {id: 3, name: 'ค่ารถ'}
    ];

  });
