 $(function(){
	 var map = null;
	 var infoWindow = null;
	 var triangleCoords = [];
	 var creator;
	 var dragging = false;
	 var rect;
	 var pos1, pos2;
	 var latlng1, latlng2;
	 var radius; // Radius of circle in miles.	 
	 var center; // LatLng of center point of circle
	 var distanceWidget;
	 var directionsDisplay;
	 var directionsService = new google.maps.DirectionsService();
	 var oldDirections = [];
	 var currentDirections = null;
	 
	 
	    function closeInfoWindow() {
	        infoWindow.close();
	    }
	 
	    function openInfoWindow(marker, content) {
	        var markerLatLng = marker.getPosition();
//	        alert(marker.title.toSource())
	        infoWindow.setContent([
	            '<div style="text-align:center;">',
	            '<b>',content,'</b> <br/>',
	            markerLatLng.lat(),
	            markerLatLng.lng(),
	            '</div>'
	        ].join(''));
	        infoWindow.open(map, marker);
	    }
	 
	    function initialize() {
	 
	        var myLatlng = new google.maps.LatLng(-33.4393767, -70.64954799999998);
	        var myOptions = {
	          zoom: 13,
	          center: myLatlng,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        }
	        geocoder = new google.maps.Geocoder();
	 
	        map = new google.maps.Map($("#map_canvas").get(0), myOptions);
	        
	        
	       
	        directionsDisplay = new google.maps.DirectionsRenderer({
	            'map': map,
	            'preserveViewport': true,
	            'draggable': true
	        });
	        
	        
	        directionsDisplay.setPanel(document.getElementById("directions_panel"));

	        google.maps.event.addListener(directionsDisplay, 'directions_changed',
	          function() {
	            if (currentDirections) {
	              oldDirections.push(currentDirections);
	              setUndoDisabled(false);
	            }
	            currentDirections = directionsDisplay.getDirections();
	          });
	        
//	        var coordenadas_espana = country.ES.coord;
//	        for (i=0; i<coordenadas_espana.length; i++){
//	           map.addOverlay(new GPolygon(coordenadas_espana[i],"#dd6600", 2, 0.7, "#993300", 0.4));
//	        }
	        
	        infoWindow = new google.maps.InfoWindow();
	        google.maps.event.addListener(map, 'click', function(){
	         closeInfoWindow();
	        });
	        
	        /////////////////////////////////
	    
	        ////////////////////////////////
	   
	    }
	    //////////////CALCULO DE RUTA
	    function calcRoute() {
	        var start = $('#start').val();
	        var end =  $('#end').val();
	        var request = {
	            origin:start,
	            destination:end,
	            travelMode: google.maps.DirectionsTravelMode.DRIVING,
				unitSystem: google.maps.DirectionsUnitSystem.METRIC,
				region: 'es'
	        };
	        directionsService.route(request, function(response, status) {
	          if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	          }
	        });
	      }

	      function undo() {
	        currentDirections = null;
	        directionsDisplay.setDirections(oldDirections.pop());
	        if (!oldDirections.length) {
	          setUndoDisabled(true);
	        }
	      }

	     
	     
	     $("#ruta").click(function(e){
	    	 calcRoute(); 
	     });
	     
	    	///DOCUMENTO LISTO
	  
	    $("#dise").click(function(e){
	    	
			 creator= new PolygonCreator(map); 
	    	
	    	google.maps.event.addListener(map, 'click', function(event) {
				    var latitud =event.latLng.Oa;
				    var longitud =event.latLng.Pa;
				    triangleCoords.push(new google.maps.LatLng(latitud, longitud))
		       
				  });

    		
	    });
	    
	   ///Imprimir mapa
//	

		    
		$('#reset').click(function(){
			 creator.destroy();
//			 rect.destroy();
//			 rect=null;
			 creator=null;
//			 creator=new PolygonCreator(map);
			 }); 
		
		///CREACION DE RECTAGULO EN EL MAPA
		$('#recta').click(function(e){
			
			 rect = new google.maps.Rectangle({
                 map: map
			 });
			 

		        google.maps.event.addListener(map, 'mousedown', function(mEvent) {
		            map.draggable = false;
		            latlng1 = mEvent.latLng;
		            dragging = true;
		            pos1 = mEvent.pixel;
		        });

		        google.maps.event.addListener(map, 'mousemove', function(mEvent) {
		            latlng2 = mEvent.latLng;
		            showRect();
		        });

		        google.maps.event.addListener(map, 'mouseup', function(mEvent) {
		            map.draggable = true;
		            dragging = false;
		        });
		  
		        google.maps.event.addListener(rect, 'mouseup', function(data){
	            map.draggable = true;
	            dragging = false;
	            
	            var lat1 = latlng1.lat();
	            var lat2 = latlng2.lat();
	            var minLat = lat1<lat2?lat1:lat2;
	            var maxLat = lat1<lat2?lat2:lat1;
	            var lng1 = latlng1.lng();
	            var lng2 = latlng2.lng();
	            var minLng = lng1<lng2?lng1:lng2;
	            var maxLng = lng1<lng2?lng2:lng1;
//	            alert('Datbase query for the following bounds:\n\nlat: ' + minLat + ' to ' + maxLat+ '\n\nlng: ' + minLng + ' to ' + maxLng);
	            
	        });
		        function showRect() {
				    if(dragging){
				        if (rect === undefined) {
				            rect = new google.maps.Rectangle({
				                map: map
				            });
				        }
				        var latLngBounds = new google.maps.LatLngBounds(latlng1, latlng2);
				        rect.setBounds(latLngBounds);
				    }
				}
//////////////////////////////////////////////////////////////////////////////
		      
		        
		        
		 });	   
			    
		
		
	
		
		$('#limpiarRectangulo').click(function(){
			rect.setMap(null);
		        
		}); 
		
		
		///DIBUJA CIRCULO EN EL MAPA
		$('#circulo').click(function(){
			 distanceWidget = new DistanceWidget(map);
//			var distanceWidget = new DistanceWidget(map);
		// google.maps.event.addDomListener(window, 'load', inicio);
//			 inicio();
			  displayInfo(distanceWidget);
			  function displayInfo(widget) {
			        var info = document.getElementById('info');
			        info.innerHTML = 'Position: ' + widget.get('position') + '<br />' + 'Distance: ' + widget.get('distance') + '<br />' + 'Bounds: ' + widget.get('bounds');
			} 
			  
			  
			 
			 
			 
		});
		$('#localiza').click(function(){
			 geolocalizame();
			
		 });
		
		
		/////////////////////////
		
		 //copiamos la función de geolocalización del ejemplo anterior.
		 
		 function pedirPosicion(pos) {
		   var centro = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
		   map.setCenter(centro); //pedimos que centre el mapa..
		   map.setMapTypeId(google.maps.MapTypeId.ROADMAP); //y lo volvemos un mapa callejero
		  alert("¡Hola! Estas en : "+pos.coords.latitude+ ","+pos.coords.longitude+" Rango de localización de +/- "+pos.coords.accuracy+" metros");
		}
		 
		function geolocalizame(){
		navigator.geolocation.getCurrentPosition(pedirPosicion);
		 }
		
		
		/////////////////////////
		
		
		$('#getdirections').click(function(){
//			$("#map_canvas").googleMap().load();
			$("#map_canvas").googleMap({
				
				    start: '#start', //Must have the #
				
				    end: '#end', //Must have the #
				
				    submit: '#getdirections', //Must have the #
				
				    directions: 'directions' //Can NOT have the #
				
				}).load();

		});	
		
		///FUNCION DE DIBUJO CIRCULO
		  function DistanceWidget(map) {
			
			    this.set('map', map);
			    this.set('position', map.getCenter());
			    var marker = new google.maps.Marker({
			        draggable: true
			    });
			    marker.bindTo('map', this);
			    marker.bindTo('position', this);
			    var radiusWidget = new RadiusWidget();
			    radiusWidget.bindTo('map', this);
			    radiusWidget.bindTo('center', this, 'position');
			    this.bindTo('distance', radiusWidget);
			    this.bindTo('bounds', radiusWidget);
			}
			DistanceWidget.prototype = new google.maps.MVCObject();

			function RadiusWidget() {
			    var circle = new google.maps.Circle({
			        fillColor: '#efefef',
			        fillOpacity: 0.5,
			        strokeColor: '#000',
			        strokeOpacity: 1.0,
			        strokeWeight: 2
			    });
			    this.set('distance', 1);
			    this.bindTo('bounds', circle);
			    circle.bindTo('center', this);
			    circle.bindTo('map', this);
			    circle.bindTo('radius', this);
			    this.addSizer_();
			}
			RadiusWidget.prototype = new google.maps.MVCObject();
			RadiusWidget.prototype.distance_changed = function() {
			    this.set('radius', this.get('distance') * 1000);
			};
			RadiusWidget.prototype.addSizer_ = function() {
			    var sizer = new google.maps.Marker({
			        draggable: true
			    });
			    sizer.bindTo('map', this);
			    sizer.bindTo('position', this, 'sizer_position');
			    var me = this;
			    google.maps.event.addListener(sizer, 'drag', function() {
			        me.setDistance();
			    });
			};
			RadiusWidget.prototype.center_changed = function() {
			    var bounds = this.get('bounds');
			    if (bounds) {
			        var lng = bounds.getNorthEast().lng();
			        var position = new google.maps.LatLng(this.get('center').lat(), lng);
			        this.set('sizer_position', position);
			    }
			};

			RadiusWidget.prototype.distanceBetweenPoints_ = function(p1, p2) {
			    if (!p1 || !p2) {
			        return 0;
			    }
			    var R = 6371;
			    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
			    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
			    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			    var d = R * c;
			    return d;
			};
			RadiusWidget.prototype.setDistance = function() {
			    var pos = this.get('sizer_position');
			    var center = this.get('center');
			    var distance = this.distanceBetweenPoints_(center, pos);
			    var distance = Math.round(distance * 100) / 100
			    var total= (1.609344 * distance );
			   // console.log(total*1000)
			   // distance=total*1000;
			    total=total*1000;
			    console.log("DISTANCIA: "+total)
			    this.set('distance', distance);
			};
			/////////////////////////////////////
			
			
			
			
			

	    $(document).ready(function() {
	    	//
//	    	$( "#datepicker" ).datepicker({
//				showOn: "button",
//				buttonImage: "images/calendar.gif",
//				buttonImageOnly: true
//			});
	    	///////////////////////////////////////////////////////
	    	
	    	//////////////////////////////////////////////////////
	   	
	    	
//	    	$("#img_04").imageLens({ borderSize: 8, borderColor: "#06f" });
//	    	$("#img_04").imageLens({ lensSize: 200 });
	    	$("#img_04").imageLens();
	    	$('#bee').imgAreaSelect({ aspectRatio: '4:4', handles: true });
	    	//NOVO SLIDER
	    	
	    	$('#slider').nivoSlider();
	    	var icons = {
	    			header: "ui-icon-circle-arrow-e",
	    			headerSelected: "ui-icon-circle-arrow-s"
	    		};
	    		$( "#accordion" ).accordion({
	    			icons: icons,
	    			fillSpace: true
	    		});
	    		$( "#toggle" ).button().toggle(function() {
	    			$( "#accordion" ).accordion( "option", "icons", false );
	    		}, function() {
	    			$( "#accordion" ).accordion( "option", "icons", icons );
	    		});
//	    		$( ".selector" ).accordion({ autoHeight: true });
	        initialize();

	        ////METODO AUTOCOMPLETE
	       $(function() {
	    	    $("#address").autocomplete({
	    	      //This bit uses the geocoder to fetch address values
	    	      source: function(request, response) {
	    	        geocoder.geocode( {'address': request.term }, function(results, status) {
	    	          response($.map(results, function(item) {
	    	            return {
	    	              label:  item.formatted_address,
	    	              value: item.formatted_address,
	    	              latitude: item.geometry.location.lat(),
	    	              longitude: item.geometry.location.lng()
	    	            }
	    	          }));
	    	        })
	    	      },
	    	      //This bit is executed upon selection of an address
	    	      select: function(event, ui) {
	 
	    	        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
//	    	        marker.setPosition(location);    	        
	    	        map.setCenter(location);
	    	  
	    	       //////// 
//	    	       distanceWidget = new DistanceWidget(map);
	    	        var marker3 = new google.maps.Marker({
	    	            map: map,
	    	            position: new google.maps.LatLng(ui.item.latitude, ui.item.longitude),
	    	            title: ui.item.value,
	    	            draggable: true
	    	        });
	    	        	
	    	        google.maps.event.addListener(marker3, 'click', function() {
	    	            openInfoWindow(marker3, ui.item.value);
	    	        });
	    	    
	    	      }
	         
	    	    });
	    	    //inicio 
	    	    //This bit uses the geocoder to fetch address values
	    	    $("#start").autocomplete({
	    	      source: function(request, response) {
	    	        geocoder.geocode( {'address': request.term }, function(results, status) {
	    	          response($.map(results, function(item) {
	    	            return {
	    	              label:  item.formatted_address,
	    	              value: item.formatted_address,
	    	              latitude: item.geometry.location.lat(),
	    	              longitude: item.geometry.location.lng()
	    	            }
	    	          }));
	    	        })
	    	      }
	    	    });
	    	    //////////////
	    	    //fin 
	    	    //This bit uses the geocoder to fetch address values
	    	    $("#end").autocomplete({
	    	      source: function(request, response) {
	    	        geocoder.geocode( {'address': request.term }, function(results, status) {	    	        	 
	    	          response($.map(results, function(item) {	    	        	 
	    	            return {	    	            	
	    	              label:  item.formatted_address,
	    	              value: item.formatted_address,
	    	              latitude: item.geometry.location.lat(),
	    	              longitude: item.geometry.location.lng()
	    	            }
//	    	            calcRoute();
	    	          }));
//	    	          calcRoute();
	    	        })
//	    	        calcRoute();
	    	      }
	    	    
	    	    });
//	    	    calcRoute();
	    	    //////////////
	    	 });
	   
	    });
 });	