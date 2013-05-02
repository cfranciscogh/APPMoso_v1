// JavaScript Document

localStorage['serviceURL'] = "http://bip.pe/smart/moso/data.php";
var serviceURL = localStorage['serviceURL'];


$(window).load(function() {
	setTimeout(getEmployeeList, 100);
});


$(document).ready(function(){	

	$("div.page div.menu a").first().addClass('select');
	id = $("div.page div.menu a").first().attr("id");
	$('div#' + id).fadeIn();	
	
	$("div.page div.menu a").click(function(){
		getEmployeeList();
		$(this).parent().find("a").removeClass('select');
		$(this).addClass('select');
		$(".pageModo").hide();
		id = $(this).attr("id");
		$('div#' + id).fadeIn();
		return false;		
	});	

});



function getEmployeeList() {
	$('#busy').show();
	var parametros = {"pais" : 1,"operadora" : 1 ,"numUser" : "12121212"};
	$("#page1 .contentPage ul").html("");
	$("#page2 .contentPage ul").html("");
	$.getJSON(serviceURL, function (data) {
		//console.log(data);
		$('#busy').hide();
		 $.each(data.wsServiciosDisponiblesResult , function(i,item){
            $.each(item , function(a,itemResult){
            	//console.log(itemResult);
				
				if(itemResult.estaSuscrito == 0){
					var fecha = new Date(itemResult.fechaSuscripcion);
					
					$("#page1 .contentPage ul").append("<li><a href=\"cine-info.html\"><div class=\"imageList\"><img src=\"img/user.jpg\" ></div><div class=\"textList\"><h1>"+itemResult.nombre+"</h1><p>"+itemResult.descripcion+"</p><p>Activo desde: 10-04-2013</p></div><div class=\"clear\"></div></a></li>");
				}
				else{
					$("#page2 .contentPage ul").append("<li><a href=\"cine-info.html\"><div class=\"imageList\"><img src=\"img/user.jpg\" ></div><div class=\"textList\"><h1>"+itemResult.nombre+"</h1><p>"+itemResult.descripcion+"</p></div><div class=\"clear\"></div></a></li>");
				}
          	});
          });
	  });
	  
	 $("div.page .pageModo").first().show();
				
				
	/*$.ajax({
	  type: "POST",
	  url: serviceURL,
	  data: parametros,
	  contentType: "application/json; charset=utf-8",
	  dataType: "json",
	  success: function(xml) {
		  //if the query was successfull,
		  console.log(xml);
		  
	  },
	 error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus + ": " + XMLHttpRequest.responseText);
	}

	 });*/
 
 
}