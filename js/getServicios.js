// JavaScript Document
var base = "http://bip.pe/smart/free/moso/data/";
//var base = "../app/";
$(document).ready(function(){
		 
			getServicios();
		});
		
		
function getServicios() {
 $('#busy').show();	
	$.getJSON(base + "getServicios.php", function (data) {
		$('#busy').hide();
		console.log(data); 
		 $.each(data.ObtenerListaServiciosResult , function(i,item){
			 
			$.each(item , function(a,itemResult){
				if(itemResult.EsDestacado == "true"){
					if(itemResult.codigo==4)
						$(".baner").append('<a href="cine.html"> <img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
					else if(itemResult.codigo==200)
						$(".baner").append('<a href="noticias.html">  <img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
					else
						$(".baner").append('<a href="#"><img src="img/'+itemResult.ImangeDestacado+'"   alt="'+itemResult.nombre+'"></a>');
						
					$(".baner").append('<div class="space10"></div>');
  // <div class="space10"></div>
  // <a href="noticias.html"> <img src="img/noticias.png"   alt="banerNoticias"></a>
				}
				else{					
					$(".servicios ul").append('<li><div class="contentImg"><img src="img/'+itemResult.Imagen+'"></div><div class="contentTxt"><p>'+itemResult.nombre+'</p><p>Ver m&aacute;s +</p></div><div class="clear"></div></li>');
				}
				 
				
			});
			$(".banner .space10").last().remove();
		  });
	  });
			
 
}
