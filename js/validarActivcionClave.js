// JavaScript Document
	function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // Cordova is ready
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, leerArchivo, falloleerArchivo);
    }

    function leerArchivo(fileSystem) {
        fileSystem.root.getFile("moso.txt", null, gotFileEntryActivacion, falloleerArchivo);
    }

    function gotFileEntryActivacion(fileEntry) {
        fileEntry.file(gotFileActivacion, falloleerArchivo);
    }

    function gotFileActivacion(file){
        //readDataUrlActivacion(file);
        readAsTextActivacion(file);
    }

    function readDataUrlActivacion(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
			var dataActivacion = $.parseJSON(evt.target.result);
			alert(dataActivacion.activacion);
        };
        reader.readAsDataURL(file);
    }

    function readAsTextActivacion(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
			var cadena = evt.target.result;
			cadena = cadena.replace("{","");
			cadena = cadena.replace("}","");
			//alert(cadena);
			ArrayCadena = cadena.split(",");
			//alert(ArrayCadena[3]);
			stringActivacion = ArrayCadena[3]
			ArrayActivacion = stringActivacion.split(":");
			if(ArrayActivacion[1].trim() == "1")
				location.href = "panel.html";
				
			stringOperadora = ArrayCadena[1]
			ArrayOperadora = stringOperadora.split(":");
			
			stringNumUser = ArrayCadena[2]
			ArrayNumUser = stringNumUser.split(":");
			
			stringPais = ArrayCadena[0]
			ArrayPais = stringPais.split(":");
				
			vOperadora = ArrayOperadora[1].trim();
			vNumUser = ArrayNumUser[1].trim();
			vPais = ArrayPais[1].trim();	
			//alert(vOperadora);	
			//	alert(vNumUser);
			//	alert(vPais);
				
        };
        reader.readAsText(file);
    }

    function falloleerArchivo(evt) {
        console.log(evt.target.error.code);
    }
