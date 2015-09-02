
angular.module('app.services.DashService', [])
  .factory('DashService', function ($q, $cordovaSQLite, $ionicPlatform) {

    return {
      getIncomeGroup: function () {

        var q = $q.defer();

        var sql = 'SELECT * FROM income_group';

        $cordovaSQLite.execute(window.db, sql, [])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;

      }
    }

  });
