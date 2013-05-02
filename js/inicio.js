// JavaScript Document
 $(document).ready(function(){	
			getEmployeeList();	
			
			$("#btnRegistrar").click( function(evento){
				
				evento.preventDefault();
				var pais =  $("#pais").find("option:selected").val();
				var operadora = $("#operadora").find("option:selected").val();
				var numUser = $("#numUser").val();
				if(	pais == "-1"){
					alert("Seleccionar pais");	
					return;
				}
				if(	operadora == "-1"){
					alert("Seleccionar operadora");	
					return;
				}
				
				if(	numUser == "" || numUser.length!= 9){
					alert("Numero de telefono incorrecto");	
					return;
				}
				
				//createFile(pais, operadora, numUser) ;
				registrarUsuario(numUser, operadora, pais);
					
				});
					
		});
		
		function registrarUsuario(numUser, operadora, pais){
			 $('#busy').show();	
			 $.getJSON("http://bip.pe/smart/app/dataServices/registrarSuscripcion.php?numUser=" + numUser + "&operadora=" + operadora, function (data) {
				console.log(data); 
				$('#busy').hide();
				if(parseInt(data.RegistrarSuscripcionResult)>0) 					 
					 createFile(pais, operadora, numUser);
				//else
					 //location.href = "error-activacion.html";	
				 
			  });
		}
		
		function getOperadora(op){
			 $('#busy').show();	
			 $("#operadora option").remove();
		  	 $("#operadora").append("<option value='-1'>-- Seleccionar --</option>");
			 if (op=="-1"){
				 $('#busy').hide();	
			 	return;
			 }
				
			 $.getJSON("http://bip.pe/smart/app/dataServices/operadora.php?pais=" + op, function (data) {
				console.log(data); 
				 $.each(data.obtenerOperadoraResult , function(i,item){
					i = 0;
					$('#busy').hide();	
					$.each(item , function(a,itemResult){
						console.log(itemResult);
						$("#operadora").append("<option value='"+itemResult.codigo+"'>"+itemResult.descripcion+"</option>");
						
					});
				  });
			  });
		}
		
		function getEmployeeList() {
			
		$("#pais").change(function(){
			var op = $(this).find("option:selected").val();				
			getOperadora(op);							
		});
			$('#busy').show();	
		  $("#pais option").remove();
		  $("#pais").append("<option value='-1'>-- Seleccionar --</option>");
		  
		   $("#operadora option").remove();
		  $("#operadora").append("<option value='-1'>-- Seleccionar --</option>");
		  
			$.getJSON("http://bip.pe/smart/app/dataServices/pais.php", function (data) {
				console.log(data); 
				$('#busy').hide();	
				 $.each(data.obtenerPaisResult , function(i,item){
					i = 0;
					$.each(item , function(a,itemResult){
						console.log(itemResult);
						$("#pais").append("<option value='"+itemResult.codigo+"'>"+itemResult.descripcion+"</option>");
						
					});
				  });
			  });
			 }