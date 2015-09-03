
angular.module('starter', [
  'ionic',
  'ngCordova',
  'app.controllers.DashController',
  'starter.controllers.IncomeController',
  'starter.services.IncomeService',
  'chart.js'
])

.run(function($ionicPlatform, $cordovaSQLite) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    window.db = $cordovaSQLite.openDB({ name: 'myMoney.db'});

    $ionicPlatform.ready(function () {
      window.db.transaction(function (tx) {
        var sqlCreateIncomeGroup = 'CREATE TABLE IF NOT EXISTS income_group (id integer primary key, name text)';
        var sqlDeleteIncomeGroup = 'DELETE FROM income_group';

        var sqlInsert1 = 'INSERT INTO income_group(name) VALUES("เงินเดือน")';
        var sqlInsert2 = 'INSERT INTO income_group(name) VALUES("ค่าเขียนโปรแกรม")';
        var sqlInsert3 = 'INSERT INTO income_group(name) VALUES("ค่ารถ")';

        var sqlIncome = 'CREATE TABLE IF NOT EXISTS incomes (id integer primary key, income_group_id integer, desc text, price number, act_date text)';

        tx.executeSql(sqlCreateIncomeGroup);

        tx.executeSql(sqlDeleteIncomeGroup);
        tx.executeSql(sqlInsert1);
        tx.executeSql(sqlInsert2);
        tx.executeSql(sqlInsert3);

        tx.executeSql(sqlIncome);

      });
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash', // #/tab/dash
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashController'
        }
      }
    })
    .state('tab.map', {
      url: '/map', // #/tab/map
      views: {
        'tab-map': {
          templateUrl: 'templates/map.html',
          controller: 'MapController'
        }
      }
    })
    .state('tab.income', {
      url: '/income/:id',
      views: {
        'tab-dash': {
          templateUrl: 'templates/income.html',
          controller: 'IncomeController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
