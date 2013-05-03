var base = "http://bip.pe/smart/free/moso/data/";
//var base = "../app/";
$(document).ready(function(){
		
			getEmployeeList();
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
								$(".salas ul").append('<li id="'+itemResult.codigo+'" cine="'+idcine+'" cinedes="'+cinedes+'"><p>'+itemResult.nombre+'</p><span>'+itemResult.direccion+'</span></li>');

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
						console.log(data); 
						$('#busy').hide();
						 $.each(data.BusquedaCarteleraPorCineResult , function(i,item){
							console.log(item); 
							$.each(item , function(a,itemResult){
								
								console.log(itemResult); 
								
								$(".peliculas ul").append('<li id="'+itemResult.codigoRespuesta+'" cine="'+idcine+'" sala="'+idsala+'"><div class="imgPelicula"><img src="'+itemResult.imagenUrlRespuesta+'" alt="pelicual"/></div><div class="despelicula"><p>'+itemResult.nombreRespuesta+'</p><span>'+
								(itemResult.direccionRespuesta.length<1? desprueba : itemResult.direccionRespuesta) +'</span></div></li>');
								
								$("h1.ayer").html( itemResult.nombreCriterio.toUpperCase() + " - CARTELERA");
							});
							 //getPeliculasPorSala()
						  });
					  }); 
			  
                });
            });

		
		}
		
		
		function volver(){
			$(".resultHoroscopo").fadeOut().html("");
			 $(".servicios").fadeIn();
		}
