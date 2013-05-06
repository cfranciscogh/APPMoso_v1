var base = "http://bip.pe/smart/free/moso/data/";
var baseLatitud = "";
var baseLongitud = "";
//var base = "../app/";
$(document).ready(function(){
		
			getEmployeeList();
			
			$('.detalle .contentDetalle a[href^="#"]').each(function() {
			
				$(this).click(function (e) {
					e.preventDefault();
			
					var target = this.hash,
					$target = $(target);
			
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top
					}, 900, 'swing', function () {
						window.location.hash = target;
					});
				});
			
			});
		
		});
		
		function getEmployeeList() {
		 $('#busy').show();	
			$.getJSON(base + "getCine.php", function (data) {
				//console.log(data); 
				$('#busy').hide();
				 $.each(data.BusquedaCinesResult , function(i,item){
					//console.log(item); 
					$.each(item , function(a,itemResult){
						//console.log(itemResult);
						//console.log(a);
						$(".servicios ul").append('<li style="cursor:pointer;" id="'+itemResult.codMarca+'"><div class="contentImg"><img src="'+itemResult.imagenMarca +'"></div><div class="contentTxt"><p class="des">'+itemResult.Marca+'</p></div><div class="clear"></div></li>');
						
						//$(".menuInicio").append('<a id="'+itemResult.codigo+'" href="#">'+itemResult.descripcion+'</a>');
						if( (a + 1)%2==0)
							$(".servicios ul").append('<div class="clear"></div>');  
						 
						
					});
					getSalaPorCine();
				  });
			  }); 
}
    function getSalaPorCine(){
		
		 //$(".menuInicio a").each(function() {
		$(".servicios ul li").each(function() {

                $(this).click(function(evento) {
                    evento.preventDefault();
                    $(".servicios").fadeOut();
					$('#busy').show();
					 $(".salas").fadeIn();
					 
					 var cinedes = $(".servicios ul li#" + $(this).attr("id")).find(".contentTxt").text().toUpperCase();
					 var idcine = $(this).attr("id");
					 $("h1.ayer").html(cinedes + " - SALAS");
					$(".salas .cine").html($(".servicios ul li#" + $(this).attr("id")).html() );
					
					//$(".resultHoroscopo").append("<h1>"+$(this).html()+"</h1><p id='chisteHoy' style='padding:20px;'></p><div class='content-registro'><div class='btnForm'><a id='btnRegistrar' onclick='volver()'>Volver</a></div></div>").fadeIn();
					
					$.getJSON(base + "getSalas_x_Cine.php?codMarca="+ $(this).attr("id"), function (data) {
						//console.log(data); 
						$('#busy').hide();
						 $.each(data.BusquedaCinePorNombreResult , function(i,item){
							//console.log(item); 
							$.each(item , function(a,itemResult){
								$(".salas ul").append('<li id="'+itemResult.codigo+'" cine="'+idcine+'" cinedes="'+cinedes+'"><div class="content-sala"><p>'+itemResult.nombre+'</p><span>'+itemResult.direccion+'</span></div></li>');
								
								

							});
							 getPeliculasPorSala()
						  });
					  }); 
			  
                });
            });

		
		}
		
		
		function getPeliculasPorSala(){
		
		 //$(".menuInicio a").each(function() {
		$(".salas ul li").each(function() {

                $(this).click(function(evento) {
                    evento.preventDefault();
                    $(".salas").fadeOut();
					$('#busy').show();
					 $(".peliculas").fadeIn();
					 $("h1.ayer").html( $(this).attr("cinedes").toUpperCase() + " - CARTELERA");
					
					 var cinedes = $(this).find("p").text().toUpperCase();
					 var idcine = $(this).attr("cine");
					  var idsala = $(this).attr("id");
					  var desprueba = "Doblada: <br/> 11:10am - 1:50pm - 4:30pm - 7:10pm - 9:50pm";

					$.getJSON(base + "getPeliculas_x_Sala.php?codigoCine="+ $(this).attr("id"), function (data) {
						//console.log(data); 
						$('#busy').hide();
						 $.each(data.BusquedaCarteleraPorCineResult , function(i,item){
							//console.log(item); 
							$.each(item , function(a,itemResult){
								
								//console.log(itemResult); 
								
								$(".peliculas ul").append('<li id="'+itemResult.codigoRespuesta+'" cine="'+idcine+'" sala="'+idsala+'"><div class="imgPelicula"><img src="'+itemResult.imagenUrlRespuesta+'" alt="pelicual"/></div><div class="despelicula"><p>'+itemResult.nombreRespuesta+'</p><span>'+
								(itemResult.direccionRespuesta.length<1? desprueba : itemResult.direccionRespuesta) +'</span><a class="vermas">Ver detalle >></a></div><div class="clear"></div> </li>');
								
								$("h1.ayer").html( itemResult.nombreCriterio.toUpperCase() + " - CARTELERA");
							});
								getPeliculaDetalle()
						  });
					  }); 
			  
                });
            });

		
		}
		
		
		function getPeliculaDetalle(){
			
		
		
		 //$(".menuInicio a").each(function() {
		$(".peliculas ul li").each(function() {

                $(this).click(function(evento) {
                    evento.preventDefault();
                    $(".peliculas").fadeOut();
					$('#busy').show();
					 $(".detalle").fadeIn();
					 					
					 var idcine = $(this).attr("cine");
					 var idsala = $(this).attr("sala");
					 var idpelicula = $(this).attr("id");
					 
					 var imagen = $(this).find(".imgPelicula").html();
					 $(".detalle .contentDetalle .contentDetalleImagen").html(imagen);	
					 
					 var titulo = $(this).find(".despelicula p").text();
					 $(".detalle #titulo").html(titulo);
					 
					  
					//console.log(base + "getPeliculaDetalle.php?codigoCine="+ idsala + "&codigoPelicula="+ idpelicula);
					$.getJSON(base + "getPeliculaDetalle.php?codigoCine="+ idsala + "&codigoPelicula="+ idpelicula, function (data) {
						//console.log(data); 
						$('#busy').hide();
						 $.each(data.BusquedaDetallePeliculaResult , function(i,item){
							//console.log(item); 
							 
							$(".detalle .contentHorario p").html(item.horarios);
							$(".detalle .contentSipnosis p").html(item.argumentoPelicula);
							$(".detalle .contentGenero p").html(item.detalles);
							$(".detalle .contentVideo p").html('Si no pueder ver el video, <a href="'+item.trailerUrlPelicula+'">hacer click aqui!</a>');
							//$(".detalle .contentMapa div").html('<p>'+item.latitud  + ',' + item.longitud +'</p>');
							
							$(".detalle .contentVideo .content-iframe").html('<iframe width="100%" height="250" src="'+item.trailerUrlPeliculaEmbed+'" frameborder="0" allowfullscreen></iframe>');
							miUbicacion(item.latitud ,item.longitud);
							/*$.each(item , function(a,itemResult){							
								console.log(itemResult);								 
							});*/
							//getPeliculaDetalle()
						  });
					  }); 
			  
                });
            });

		
		}
		
		
		function ocultarDetalle(){
			 $('.detalle').fadeOut('fast', function() {
				$(".peliculas").fadeIn();
			  });
  
			/*$(".detalle").fadeOut();
			 $(".peliculas").fadeIn();*/
		}
		
		
		
		function miUbicacion(latitudCine, longitudCine){
			
			baseLatitud = latitudCine;
			baseLongitud = longitudCine;
 
			//errorGeo
			$('#errorGeo').html("Detectando ubicacion ...");
				
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(mostrar_mapa, gestiona_errores);
			} 
			else {
				$('#errorGeo').html("No soporta geolocalizacion ...");			  
			}

	
		}
		
		function mostrar_mapa(position) {
			
		  	$('#errorGeo').html("");
		
			var latitud = position.coords.latitude;
			var longitud = position.coords.longitude;
			
			var myLocation = new google.maps.LatLng(latitud, longitud);

			map  = new google.maps.Map(document.getElementById('geoLocation'), {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: myLocation,
				zoom: 10
			});
				
			var marker = new google.maps.Marker({
				map: map,
				position: myLocation,
				icon: "img/yomapa.png"

			}); 
			
			var myLocationCine = new google.maps.LatLng(parseFloat(baseLatitud), parseFloat(baseLongitud));
			var markerCine = new google.maps.Marker({
				map: map,
				position: myLocationCine,
				icon: "img/cinemapa.png"

			}); 
	
		}

		
		function gestiona_errores(err) {	 
			
		  if (err.code == 0) {
			$('#errorGeo').html("Error: desconocido");
		  }
		  if (err.code == 1) {
			$('#errorGeo').html("Error: El usuario no ha compartido su posicion");
		  }
		  if (err.code == 2) {
			$('#errorGeo').html("Error: No se puede obtener la posicion actual");
		  }
		  if (err.code == 3) {
			$('#errorGeo').html("Error: Timeout recibiendo la posicion");
		  }
		}
