// JavaScript Document
var base = "http://bip.pe/smart/free/noticias/data/";
var isDestacado = true;
$(document).ready(function(){	
	getFecha();
	
	$('.page .contentMenu a.m').each(function() {			
			$(this).click(function (e) {
				//alert(8);
				e.preventDefault();
				$('.page .contentMenu a').removeClass("select");
				$(this).addClass("select");
				
				var div = $(this).attr("title");
				$(".contentPage").fadeOut("fast", function(){
					$("#" + div).fadeIn("fast");
				});				 
			});			
	});
			
});

function getFecha(){
	//alert(1);
	$('#busy').show();	
	$.get(base + "getFecha.php", function (data) {
		//console.log(data); 
		$('#fecha p').html(data);
		getNoticias();
	});	
}

function getNoticias() {
		 
			$.getJSON(base + "getNoticias.php", function (data) {
				//console.log(data); 
				$('#busy').hide();
				 $.each(data.getNoticiasResult , function(i,item){
					//console.log(item); 
					$.each(item , function(a,itemResult){
						//console.log(itemResult);
						
						if(itemResult.Categoria == 1){
							$("#generales").append('<tr><td style="width:90px;"><a href="'+itemResult.URLVideo + itemResult.Archivo +'"><img src="'+itemResult.URLImagen + itemResult.Imagen +'" alt="'+itemResult.NombreNoticia +'"></a></td><td class="txt"><a href="'+itemResult.URLVideo + itemResult.Archivo +'">'+itemResult.Descripcion +'</a></td></tr>');
						}
						
						if(itemResult.Categoria == 2){
							$("#deportes").append('<tr><td style="width:90px;"><a href="'+itemResult.URLVideo + itemResult.Archivo +'"><img src="'+itemResult.URLImagen + itemResult.Imagen +'" alt="'+itemResult.NombreNoticia +'"></a></td><td class="txt"><a href="'+itemResult.URLVideo + itemResult.Archivo +'">'+itemResult.Descripcion +'</a></td></tr>');
						}
						
						if(itemResult.Categoria == 3){
							$("#espectaculos").append('<tr><td style="width:90px;"><a href="'+itemResult.URLVideo + itemResult.Archivo +'"><img src="'+itemResult.URLImagen + itemResult.Imagen +'" alt="'+itemResult.NombreNoticia +'"></a></td><td class="txt"><a href="'+itemResult.URLVideo + itemResult.Archivo +'">'+itemResult.Descripcion +'</a></td></tr>');
						}
						
						if(itemResult.Categoria == 4 && isDestacado){
							isDestacado = false;
							
							$("#destacado").append('<a href="'+itemResult.URLVideo + itemResult.Archivo +'"><img src="'+itemResult.URLImagen + itemResult.Imagen +'" alt="'+itemResult.NombreNoticia +'"></a><a href="'+itemResult.URLVideo + itemResult.Archivo +'"><span>'+itemResult.Descripcion +'</span></a>');
							
							 
						}
						
												
						 
						
					});
					 
				  });
			  }); 
}