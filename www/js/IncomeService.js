
angular.module('starter.services.IncomeService', [])
  .factory('IncomeService', function ($q, $cordovaSQLite) {

    return {

      save: function (data) {

        var q = $q.defer();

        var sql = 'INSERT INTO incomes (income_group_id, desc, price, act_date) ' +
          'VALUES(?, ?, ?, ?)';

        $cordovaSQLite.execute(window.db, sql, [
          data.incomeGroupId,
          data.desc,
          data.price,
          data.date
        ])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;

      },

      getAll: function (id) {

        var q = $q.defer();

        var sql = 'SELECT * FROM incomes WHERE income_group_id=?';

        $cordovaSQLite.execute(window.db, sql, [id])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;

      }

    }

  });
