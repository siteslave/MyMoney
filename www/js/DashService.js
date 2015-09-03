
angular.module('app.services.DashService', [])
  .factory('DashService', function ($q, $cordovaSQLite) {

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

      },

      getChartData: function () {
        var q = $q.defer();

        var sql = 'SELECT g.name, SUM(i.price) AS total FROM incomes AS i ' +
          'INNER JOIN income_group AS g ON g.id=i.income_group_id ' +
          'GROUP BY g.id';

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
