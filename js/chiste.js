// JavaScript Document
var base = "http://bip.pe/smart/free/moso/data/";
var codigo = 0;
var comando = "";
//var base = "../app/";
$(document).ready(function(){
		 	
			if(location.search.substr(1)){
				Variables = location.search.substr(1).split ('&');
				for (i = 0; i < Variables.length; i++) {
				  Separ = Variables[i].split('=');
				  eval (Separ[0]+'="'+Separ[1]+'"');
				}
				//alert('Nombre: '+codigo+'n\Comando: @'+comando);
		  	}
			
			
			getEmployeeList();
		});
		function getEmployeeList() {
		 $('#busy').show();	
			$.getJSON(base + "chiste.php?codigo=" + codigo + "&comando=" + comando, function (data) {
				$('#busy').hide();
				console.log(data); 
				 $.each(data.selectContenidoSuscripcionResult , function(i,item){
					i = 0;
					$.each(item , function(a,itemResult){
						console.log(itemResult);
						if(i==0){
							$(".ayer").html(comando + " AYER");	
							$("#chisteAyer").html(itemResult.contenido);
						}
						else{
							$(".hoy").html(comando + " HOY");	
							$("#chisteHoy").html(itemResult.contenido);
						}
						i++;
						
					});
				  });
			  });
			
 
}
