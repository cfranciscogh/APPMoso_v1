// JavaScript Document
var base = "http://bip.pe/smart/app/";
//var base = "../app/";
$(document).ready(function(){
		 
			getEmployeeList();
		});
		function getEmployeeList() {
		 $('#busy').show();	
			$.getJSON(base + "dataServices/chiste.php", function (data) {
				$('#busy').hide();
				console.log(data); 
				 $.each(data.selectContenidoSuscripcionResult , function(i,item){
					i = 0;
					$.each(item , function(a,itemResult){
						console.log(itemResult);
						if(i==0)
							$("#chisteAyer").html(itemResult.contenido);
						else
							$("#chisteHoy").html(itemResult.contenido);
						i++;
						
					});
				  });
			  });
			
 
}
