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
						  
						i++;
						
					});
					//getHoroscopo();
				  });
			  }); 
}
    function getHoroscopo(){
		
		 //$(".menuInicio a").each(function() {
		$(".servicios ul li").each(function() {

                $(this).click(function(evento) {
                    evento.preventDefault();
                    $(".servicios").fadeOut();
					$('#busy').show();
					$(".resultHoroscopo").append("<h1>"+$(this).html()+"</h1><p id='chisteHoy' style='padding:20px;'></p><div class='content-registro'><div class='btnForm'><a id='btnRegistrar' onclick='volver()'>Volver</a></div></div>").fadeIn();
					$.getJSON(base + "dataServices/horoscopo.php?comando="+ $(this).attr("id"), function (data) {
						console.log(data); 
						$('#busy').hide();
						 $.each(data.selectContenidoSuscripcionResult , function(i,item){
							i = 0;
							$.each(item , function(a,itemResult){
								console.log(itemResult);
								if(i==0)
									$("#chisteAyer").html( (itemResult.contenido==null?"No hay contenido":itemResult.contenido)   );
								else
									$("#chisteHoy").html((itemResult.contenido==null?"No hay contenido":itemResult.contenido));
								  
								i++;
								
							});
						  });
					  }); 
			  
                });
            });

		
		}
		function volver(){
			$(".resultHoroscopo").fadeOut().html("");
			 $(".servicios").fadeIn();
		}
