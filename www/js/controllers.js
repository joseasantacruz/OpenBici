angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
 /* $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
*/
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MenuCtrl', function($scope, $state) {

  $scope.getClass = function(nombre) {
    // Si esta en este estado.
    if ($state.current.name.indexOf(nombre) !== -1) return 'menu-selected';
    else return '';
  };
  
  
})

.controller('visualizacionCtrl',  function($window) {
	//console.log("Voy a dibujar mapa");
	dibujarElMapa($window.innerWidth, $window.innerHeight);
})

.controller('ComunidadesCtrl', function($scope,ComunidadesService, Initializer,$timeout) {
	//$scope.marcador=[];
	var icono  = L.icon({
		iconUrl: 'http://icons.iconarchive.com/icons/sonya/swarm/64/Bike-icon.png',
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	var map = L.map('map_div') ;
	$scope.points=[];
	$scope.marcadores = function() {
		$scope.points=[];
		$scope.addresses = ComunidadesService.getAddress();
		/* 
		$timeout(function(){
			$scope.marcador.push([$scope.addresses[0][0],$scope.addresses[0][1],$scope.dat.lat,$scope.dat.lon]);console.log($scope.marcador );
		},1000)*/
		for(var i=0;i<$scope.addresses.length;i++) {
				//console.log( i );
				var point =L.marker([$scope.addresses[i][2],$scope.addresses[i][3]], {icon: icono}).bindPopup($scope.addresses[i][1]).openPopup()	  ;
				$scope.points.push(point);
				map.addLayer(point);
			}
	};
	$scope.DibujarMapa = function() {
			
		
		
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 20
		}).addTo(map);
		map.locate({ setView: true, maxZoom: 6});
		function onLocationFound(e) {  
			L.marker(e.latlng).addTo(map)
		};
		map.on('locationfound', onLocationFound); 
		$scope.marcadores(); 
		/*map.on('click', onMapClick);
		function onMapClick(e) {
			for (i=0;i<$scope.points.length;i++) {
			  map.removeLayer($scope.points[i]);
			  map.addLayer($scope.points[i]);
			}
							
			//$scope.marcadores(); 
		}*/
		map.on('click', function() {
			$scope.marcadores(); 
		});
		function onLocationError(e) {
			alert(e.message);
		};
		map.on('locationerror', onLocationError);
		map.on('popupclose', function() {
			$scope.marcadores(); 
		});
			
	};	
	
	/*cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
    console.log("Location is " + (enabled ? "enabled" : "disabled"));
	}, function(error){
    console.error("The following error occurred: "+error);
	});
	*/
	if (window.cordova) {
		cordova.plugins.diagnostic.isLocationEnabled(
		function(e) {
			if (e){
				//alert(" ubicación  habilitada");
			  $scope.DibujarMapa();
			} 
			if (!e) {
			  alert("La ubicación esta deshabilitada");
			  cordova.plugins.diagnostic.switchToLocationSettings();
			   $timeout(function() {
					$scope.DibujarMapa();
				}, 3000); 
			}
		},
		function(e) {
			alert('Error ' + e);
		}
		);
	};
	if (!window.cordova) {
		//alert(" web");
		$scope.DibujarMapa();
	}
	
})

.controller('caminosCtrl', function($scope ) {

	var map = L.map('map' ); 
	L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
		attribution: '<a>- - - </a>Lineas azules punteadas representan las ciclovias 	<br>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'  ,
		maxZoom: 18,
		id: 'your.mapbox.project.id',
		accessToken: 'your.mapbox.public.access.token'
	}).addTo(map); 
	map.locate({ setView: true, maxZoom: 13});
	function onLocationFound(e) {  
		L.marker(e.latlng).addTo(map)
	};
	map.on('locationfound', onLocationFound);
	function onLocationError(e) {
		alert(e.message);
	}
	map.on('locationerror', onLocationError);
  
})