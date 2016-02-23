// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	$ionicPlatform.on("resume", function() {
      console.log("resume");
	 // alert("resume");
	  //$state.reload();
	  //$state.forceReload();
	  // $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
	  //$state.go('app.comunidades', null, {reload: true});
	   //$state.go('app.comunidades');
	   $state.go($state.current, {}, {reload: true});
    });
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
			controller: 'MenuCtrl'
  })

 
    .state('app.comunidades', {
      url: '/comunidades',
      views: {
        'menuContent': {
          templateUrl: 'templates/comunidades.html' ,
			controller: 'ComunidadesCtrl'
        }
      }
    })

  .state('app.caminos', {
    url: '/caminos',
    views: {
      'menuContent': {
        templateUrl: 'templates/caminos.html',
			controller: 'caminosCtrl'
      }
    }
  })
  
  .state('app.visualizacionComunidades', {
      url: '/visualizacionComunidades',
      views: {
        'menuContent': {
          templateUrl: 'templates/visualizacionComunidades.html',
			controller: 'visualizacionCtrl'

        }
      }
    })
	/*.state('app.caminosbicis', {
		url: '/caminosbicis',
		views: {
		  'menuContent': {
			templateUrl: 'templates/caminosBicis.html'
		  }
		}
	  })*/
	
	;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/comunidades');
});
