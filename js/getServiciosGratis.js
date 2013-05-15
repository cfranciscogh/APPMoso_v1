// JavaScript Document
var base = "http://bip.pe/smart/free/moso/data/";
//var base = "../app/";
$(document).ready(function(){
		 
			getServicios();
		});
		
		
function getServicios() {
 $('#busy').show();	
	$.getJSON(base + "getServiciosGratis.php", function (data) {
		$('#busy').hide();
		console.log(data); 
		 $.each(data.ObtenerListaServiciosGratisResult , function(i,item){
			 
			$.each(item , function(a,itemResult){
				if(itemResult.EsDestacado == "true"){
					if(itemResult.codigo==4)
						$(".baner").append('<a href="cine.html"> <img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
					else if(itemResult.codigo==200)
						$(".baner").append('<a href="noticias.html">  <img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
					else
						$(".baner").append('<a href="#"><img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
						
					$(".baner").append('<div class="space10"></div>');
					
				}
				else{	
					if(itemResult.codigo==43)		
					$(".servicios ul").append('<li><div class="contentImg"><a href="horoscopo.html"><img src="img/'+itemResult.Imagen+'"></a></div><div class="contentTxt"><a href="horoscopo.html"><p>'+itemResult.nombre+'</p><p>Ver m&aacute;s +</p></a></div><div class="clear"></div></li>');
					else if(itemResult.codigo==130)		
					$(".servicios ul").append('<li><div class="contentImg"><a href="fulltrack.html"><img src="img/'+itemResult.Imagen+'"></a></div><div class="contentTxt"><a href="fulltrack.html"><p>'+itemResult.nombre+'</p><p>Ver m&aacute;s +</p></a></div><div class="clear"></div></li>');
					else		
					$(".servicios ul").append('<li><div class="contentImg"><a href="contenido.html?codigo='+itemResult.codigo+'&comando='+itemResult.AppComando+'"><img src="img/'+itemResult.Imagen+'"></a></div><div class="contentTxt"><a href="contenido.html?codigo='+itemResult.codigo+'&comando='+itemResult.AppComando+'"><p>'+itemResult.nombre+'</p><p>Ver m&aacute;s +</p></a></div><div class="clear"></div></li>');
				}
				 
				
			});
			$(".banner .space10").last().remove();
		  });
	  });
			
 
}
