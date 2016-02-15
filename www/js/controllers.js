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
.controller('ComunidadesCtrl', function($scope,ComunidadesService, Initializer,$window) {
		if ($window.cordova) {
			cordova.plugins.diagnostic.isLocationEnabled(
			function(e) {
				if (e){
				  successFunctionCall();
				}   
				else {
				  alert("Location Not Turned ON");
				  cordova.plugins.diagnostic.switchToLocationSettings();
				}
			},
			function(e) {
				alert('Error ' + e);
			}
            );
        };
	var map = L.map('map_div') ;
	var icono  = L.icon({
		iconUrl: 'http://icons.iconarchive.com/icons/sonya/swarm/64/Bike-icon.png',
		  
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 20
	}).addTo(map);
	map.locate({ setView: true, maxZoom: 6});
	function onLocationFound(e) {  
		L.marker(e.latlng).addTo(map)
	};
	map.on('locationfound', onLocationFound); 

	 a1=   L.marker([-25.308,-57.6], {icon: icono}).addTo(map).bindPopup('<b>Ciudad o Municipio</b>:1  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">')  ;
	 a2=   L.marker([-26.308,-57.6], {icon: icono}).addTo(map).bindPopup('<b>Ciudad o Municipio</b>:2  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">');
	 
	/*var a1= new L.marker([-25.308,-57.6], {icon: icono});
	var	a2= new L.marker([-26.308,-57.6], {icon: icono});
		map.addLayer(a1 );
		map.addLayer( a2);
		a1.bindPopup('<b>Ciudad o Municipio</b>:1  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">').openPopup();
		a2.bindPopup('<b>Ciudad o Municipio</b>:2  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">').openPopup();
	*/
	map.on('click', onMapClick);
	function onMapClick(e) { 
		map.removeLayer(a1);
		map.removeLayer(a2);
		
		a1=   L.marker([-25.308,-57.6], {icon: icono}).addTo(map).bindPopup('<b>Ciudad o Municipio</b>:1  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">')  ;
	 a2=   L.marker([-26.308,-57.6], {icon: icono}).addTo(map).bindPopup('<b>Ciudad o Municipio</b>:2  </br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">');
	};
	function onLocationError(e) {
		alert(e.message);
	}
	map.on('locationerror', onLocationError);
	
	 /*
	 google.charts.load('current', {
        packages: ['map']
      });
      google.charts.setOnLoadCallback(ComunidadesService.drawMap);
	  */
	 
	/*
	 var options = {
          zoomLevel: 6,
          showTip: true,
          useMapTypeControl: true,
          icons: {
            blue: {
              normal: url + 'Map-Marker-Ball-Azure-icon.png',
              selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
            },
            green: {
              normal: 'http://icons.iconarchive.com/icons/sonya/swarm/64/Bike-icon.png',
              selected: 'http://icons.iconarchive.com/icons/sonya/swarm/96/Bike-icon.png'
            },
            pink: {
              normal: url + 'Map-Marker-Ball-Pink-icon.png',
              selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
            }
          }
        };
	L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
	
	  

      function drawMap() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Address');
        data.addColumn('string', 'Location');
        data.addColumn('string', 'Marker')

        data.addRows([
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici te ves mejor</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14965 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12191068_730964630342544_3014975479325734034_n.jpg?oh=ce527eaea84ec620abdce91335727408&oe=573A5C15" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Paraguay en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):21910 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/12241620_965539076855674_6702444095421777890_n.jpg?oh=3f5b3a33a6d99420a3691dfee4920357&oe=573B1B17" width="300" height="300">',     'green' ],
        ['Capiatá,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Capiatá</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Capiatá en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):2682 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/10592619_866601026746792_5276114722496174593_n.jpg?oh=db860d55186287ed0c7e8be0dbc4e838&oe=573E9075" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Bicicentro</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):8475 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/12189777_442847012576424_9176608194249232223_n.jpg?oh=77489a0bd4c323c8d9ae9acc7d9f3fac&oe=57347F17" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Masa Crítica Asunción</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):4228 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/t31.0-8/c0.91.851.315/p851x315/12657770_566599493504972_6565554461186843066_o.jpg" width="300" height="300">',     'green' ],
        ['Fernando de la Mora,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Fernando de la Mora</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Fdo a Pedal</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):3912 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/12308357_699057606860865_7476701833924946093_n.jpg?oh=8dbca9b3e384a9057f4315e8d1ef3689&oe=572F963C" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Bicimuni</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):2439 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/11150971_934723209920480_1007436813776885093_n.jpg?oh=10b48b43e89ae0b49f20c1c4ffaaae87&oe=57411BD7" width="300" height="300">',     'green' ],
        ['Lambaré,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Lambaré</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Lamberbici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):4909 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/c0.87.851.315/p851x315/11111156_454715368027539_5478519691966776466_o.jpg" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: AsuEnBici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):423 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xla1/v/t1.0-9/10354728_782008725164239_8945969252529066791_n.jpg?oh=62148c43dab733f69e24efd334c9f9d8&oe=572EF6B0" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Bicitando Py</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):2690 ciclistas) <img src="https://static.xx.fbcdn.net/rsrc.php/v2/yJ/r/UgNUNkKQar6.png" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Biker Paraguay</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):5083 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xpa1/v/l/t1.0-9/1915650_10208729817666583_2086392207055796375_n.jpg?oh=c2172164986a6548778479019e455a0c&oe=573E374C" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: Ciclismo Paraguayo</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):24426 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-ash2/t31.0-8/c0.67.851.315/p851x315/10931584_784138855001963_5336144865347436455_o.jpg" width="300" height="300">',     'green' ],
        ['Asunción,Asunción, Paraguay',        '<b>Ciudad o Municipio</b>: Asunción</br> <b>Departamento o Gobernacion</b>: Asunción</br> <b>Nombre del Grupo o Comunidad</b>: BiciCooltura</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):2998 ciclistas) <img src="https://static.xx.fbcdn.net/rsrc.php/v2/yJ/r/UgNUNkKQar6.png" width="300" height="300">',     'green' ],
        ['Luque,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Luque</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: LUQUE en BICI"</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):3284 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/11226172_872480136176002_293648638002420244_n.jpg?oh=a2f679efbad364adf68d6f7b140d32d1&oe=573F11F8" width="300" height="300">',     'green' ],
        ['Areguá,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Areguá</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Aregua En Bici Amigo Aventurero</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):263 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xlp1/v/t1.0-9/11755177_144089925924085_8164772465287223718_n.jpg?oh=b13e40c9d615a80b88b1715199a601ab&oe=573D9A5B" width="300" height="300">',     'green' ],
        ['San Lorenzo,Central, Paraguay',        '<b>Ciudad o Municipio</b>: San Lorenzo</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: San Lorenzo En Bici - SLEB"</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):779 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/1918977_1078299242210581_1181811136768877031_n.jpg?oh=bf9f68d85dc7afc43ae41c58cd249e42&oe=5738B6F8" width="300" height="300">',     'green' ],
        ['Mariano Roque Alonso,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Mariano Roque Alonso</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Mariano en bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):2062 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12494976_1190942240933172_6365208637907996595_n.jpg?oh=7f4d1e9cdf996ad5c556e9f84eecab7e&oe=576B3DB5" width="300" height="300">',     'green' ],
        ['Fernando de la Mora,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Fernando de la Mora</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Fernando en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):82 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/12063790_536888959805462_3136567388871858089_n.jpg?oh=503e71af50f36fbc697e2848941b7c00&oe=5725FC39" width="300" height="300">',     'green' ],
        ['Limpio,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Limpio</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Limpio en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):394 ciclistas) <img src="https://static.xx.fbcdn.net/rsrc.php/v2/yJ/r/UgNUNkKQar6.png" width="300" height="300">',     'green' ],
        ['Ñemby,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Ñemby</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Ñemby en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):1427 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/11036538_1689098778000820_6488991731399072593_n.jpg?oh=f7547b9a9fc6dc673d0fd337cab3f949&oe=573E9E1E" width="300" height="300">',     'green' ],
        ['San Antonio,Central, Paraguay',        '<b>Ciudad o Municipio</b>: San Antonio</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: San Antonio en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):21 ciclistas) <img src="" width="300" height="300">',     'green' ],
        ['Villa Elisa,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Villa Elisa</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Villa Elisa en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):1886 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/10486135_10152785936981054_354957067971001957_n.jpg?oh=454f68ebe8838c7c1cc7c4635a315c83&oe=576DA8E7" width="300" height="300">',     'green' ],
        ['Ypané,Central, Paraguay',        '<b>Ciudad o Municipio</b>: Ypané</br> <b>Departamento o Gobernacion</b>: Central</br> <b>Nombre del Grupo o Comunidad</b>: Ypane-en-bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):28 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10455561_633109203485516_5854337176498727620_n.jpg?oh=0b700a3e623e79e18896f49b3a438aad&oe=5734520C" width="300" height="300">',     'green' ],
        ['Filadelfia,Boquerón, Paraguay',        '<b>Ciudad o Municipio</b>: Filadelfia</br> <b>Departamento o Gobernacion</b>: Boquerón</br> <b>Nombre del Grupo o Comunidad</b>: FILADELFIA EN BICICLETAS</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):10 ciclistas) <img src="" width="300" height="300">',     'green' ],
        ['Concepción,Concepción, Paraguay',        '<b>Ciudad o Municipio</b>: Concepción</br> <b>Departamento o Gobernacion</b>: Concepción</br> <b>Nombre del Grupo o Comunidad</b>: ConBici. Concepción en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):289 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11129895_824567260984403_7984456515563569393_n.jpg?oh=69181d1484e51638ba0d15c817b689c4&oe=573ED0F8" width="300" height="300">',     'green' ],
        ['Pedro Juan Caballero,Amambay, Paraguay',        '<b>Ciudad o Municipio</b>: Pedro Juan Caballero</br> <b>Departamento o Gobernacion</b>: Amambay</br> <b>Nombre del Grupo o Comunidad</b>: PJC en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):20 ciclistas) <img src="" width="300" height="300">',     'green' ],
        ['San Pedro,San Pedro, Paraguay',        '<b>Ciudad o Municipio</b>: San Pedro</br> <b>Departamento o Gobernacion</b>: San Pedro</br> <b>Nombre del Grupo o Comunidad</b>: San Pedro en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):321 ciclistas) <img src="https://static.xx.fbcdn.net/rsrc.php/v2/yJ/r/UgNUNkKQar6.png" width="300" height="300">',     'green' ],
        ['Capiibary,San Pedro, Paraguay',        '<b>Ciudad o Municipio</b>: Capiibary</br> <b>Departamento o Gobernacion</b>: San Pedro</br> <b>Nombre del Grupo o Comunidad</b>: Capiibary en bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):235 ciclistas) <img src="" width="300" height="300">',     'green' ],
        ['Katuete,Canindeyú, Paraguay',        '<b>Ciudad o Municipio</b>: Katuete</br> <b>Departamento o Gobernacion</b>: Canindeyú</br> <b>Nombre del Grupo o Comunidad</b>: Corrida En Bici Katuete</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):36 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12088420_137819086570046_610089026866385462_n.jpg?oh=d6e2b8da5e3b04adf6e1e118da51bf37&oe=5768FC3D" width="300" height="300">',     'green' ],
        ['Caacupé,Cordillera, Paraguay',        '<b>Ciudad o Municipio</b>: Caacupé</br> <b>Departamento o Gobernacion</b>: Cordillera</br> <b>Nombre del Grupo o Comunidad</b>: Caacupé En Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):1066 ciclistas) <img src="https://static.xx.fbcdn.net/rsrc.php/v2/yJ/r/UgNUNkKQar6.png" width="300" height="300">',     'green' ],
        ['Ayolas,Misiones, Paraguay',        '<b>Ciudad o Municipio</b>: Ayolas</br> <b>Departamento o Gobernacion</b>: Misiones</br> <b>Nombre del Grupo o Comunidad</b>: Ayolas en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):1082 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10361391_677330589001414_2913407659036625141_n.jpg?oh=25a5c135978dc894c7c248d3286a74a8&oe=5731346D" width="300" height="300">',     'green' ],
        ['Caazapá,Caazapá, Paraguay',        '<b>Ciudad o Municipio</b>: Caazapá</br> <b>Departamento o Gobernacion</b>: Caazapá</br> <b>Nombre del Grupo o Comunidad</b>: Caazapa en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):167 ciclistas) <img src="" width="300" height="300">',     'green' ],
        ['Caazapá,Caazapá, Paraguay',        '<b>Ciudad o Municipio</b>: Caazapá</br> <b>Departamento o Gobernacion</b>: Caazapá</br> <b>Nombre del Grupo o Comunidad</b>: Caazapà en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):14 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11796428_10207868056999898_399142567636605685_n.jpg?oh=2313fb0a43268d5c49c59ebc317860ac&oe=57288FD1" width="300" height="300">',     'green' ],
        ['San Juan Nepomuceno,Caazapá, Paraguay',        '<b>Ciudad o Municipio</b>: San Juan Nepomuceno</br> <b>Departamento o Gobernacion</b>: Caazapá</br> <b>Nombre del Grupo o Comunidad</b>: San Juan Nepomuceno en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):675 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/c0.177.851.315/p851x315/11703076_447313975393680_8713039044888553164_n.jpg?oh=86a90a435f4b18abfef200fbc5ecfe60&oe=572D51B1" width="300" height="300">',     'green' ],
        ['Encarnación,Itapúa, Paraguay',        '<b>Ciudad o Municipio</b>: Encarnación</br> <b>Departamento o Gobernacion</b>: Itapúa</br> <b>Nombre del Grupo o Comunidad</b>: Encarnación En Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):19 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/10603370_10203455336758812_5044912749234353264_n.jpg?oh=4faf983e6d64947ff6fd49a9797ae21b&oe=576934DD" width="300" height="300">',     'green' ],
        ['Coronel Bogado,Itapúa, Paraguay',        '<b>Ciudad o Municipio</b>: Coronel Bogado</br> <b>Departamento o Gobernacion</b>: Itapúa</br> <b>Nombre del Grupo o Comunidad</b>: Bogado En Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):274 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/601269_457041764387455_1133972259_n.jpg?oh=a26997101fdc9fc998ecb6ecfe9a9924&oe=573A4981" width="300" height="300">',     'green' ],
        ['Hohenau,Itapúa, Paraguay',        '<b>Ciudad o Municipio</b>: Hohenau</br> <b>Departamento o Gobernacion</b>: Itapúa</br> <b>Nombre del Grupo o Comunidad</b>: Hohenau en Bici</br> <b>Cantidad de Ciclistas</b> (Likes, Members, Followers):448 ciclistas) <img src="https://scontent-gru2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/549928_437003776369914_964381644_n.jpg?oh=f22f5bbb5ee9cef717746cfdd0ad9b9c&oe=576B98C7" width="300" height="300">',     'green' ]



        ]);
        var url = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';

        var options = {
          zoomLevel: 6,
          showTip: true,
          useMapTypeControl: true,
          icons: {
            blue: {
              normal: url + 'Map-Marker-Ball-Azure-icon.png',
              selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
            },
            green: {
              normal: 'http://icons.iconarchive.com/icons/sonya/swarm/64/Bike-icon.png',
              selected: 'http://icons.iconarchive.com/icons/sonya/swarm/96/Bike-icon.png'
            },
            pink: {
              normal: url + 'Map-Marker-Ball-Pink-icon.png',
              selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
            }
          }
        };
        var map = new google.visualization.Map(document.getElementById('map_div'));

        map.draw(data, options);
      }*/
})

.controller('caminosCtrl', function($scope ) {

	var map = L.map('map' ); 
	L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
		ttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'  ,
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