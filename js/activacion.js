// JavaScript Document
var vOperadora = "";
	var vNumUser = "";
	var vPais = "";
	
	$(document).ready(function(){	
			//getEmployeeList();	
			
			$("#btnRegistrar").click( function(evento){
				
				evento.preventDefault();
				var codigo = $("#codigo").val();
								
				if(	codigo == "" || codigo.length<3){
					alert("codigo incorrecto");	
					return;
				}
				
				//createFile(pais, operadora, numUser) ;
				validarUsuario(vNumUser, vOperadora, vPais, codigo);
					
				});
					
		});
		
		function validarUsuario(numUser, operadora, pais, clave){
		//alert(vNumUser);
		//alert(numUser);
		numUser = numUser.replace("'","");
		numUser = numUser.replace("'","");
			 $('#busy').show();	
			 console.log("../app/dataServices/validarSuscripcion.php?numUser=" + numUser + "&clave=" + clave);
			 $.getJSON("http://bip.pe/smart/app/dataServices/validarSuscripcion.php?numUser=" + numUser + "&clave=" + clave, function (data) {
				//alert(data); 
				$('#busy').hide();
				 $.each(data.ExisteUsuarioSuscripcionResult , function(i,itemResult){
				 	//alert(itemResult)
				 		console.log(itemResult.estado);
					 if(itemResult.estado==1){
					 	
					 	createFile(pais, operadora, numUser);
					 //					 
					 //	location.href = "panel.html";
					 }
					 else{
						 alert("Error: Codigo de activacion erroneo, vuelva a intentarlo");
					 console.log(itemResult.estado);
					 }
					 
				  });

				 
			  });
		}
		
