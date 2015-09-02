// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'app.controllers.DashController'
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
        var sqlInsert1 = 'INSERT INTO income_group(name) VALUES("ค่าอาหาร")';
        var sqlInsert2 = 'INSERT INTO income_group(name) VALUES("ค่าน้ำ")';
        var sqlInsert3 = 'INSERT INTO income_group(name) VALUES("ค่ารถ")';

        tx.executeSql(sqlCreateIncomeGroup);

        tx.executeSql(sqlDeleteIncomeGroup);
        tx.executeSql(sqlInsert1);
        tx.executeSql(sqlInsert2);
        tx.executeSql(sqlInsert3);

      });
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
    .state('tab.loading', {
      url: '/loading',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-loading.html',
          controller: function ($timeout, $state) {
            $timeout(function () {
              $state.go('tab.dash');
            }, 2000);
          }
        }
      }
    })

  .state('tab.chats', {
      url: '/chats', // #/tab/charts
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/loading');

});
