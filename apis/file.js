/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var paramPais = "";
var paramOperadora = "";
var paramNumUser = "";

var myFS = 0;
var myFileEntry = 0;
function failFS(evt) {
    console.log(evt.target.error.code);
    $('#file-system-text').html("<strong>File System Error: " + evt.target.error.code + "</strong>");  
}
function writeFail(error) {
    console.log("Create/Write Error: " + error.code);
    $('#file-status').html("Create/Write <strong>Error: " + error.code + "</strong>");   
}

// api-file  Create
function createGotNewFile(file){
    $('#file-status').html("Created: <strong>" + file.fullPath + "</strong>");
    $('#file-read-text').empty();  
    $('#file-read-dataurl').empty();
	 writeFile()
}
function createGotFileEntry(fileEntry) {
    myFileEntry = fileEntry;
    fileEntry.file(createGotNewFile, writeFail);
}
function gotFS(fileSystem) {
    myFS = fileSystem;
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    $('#file-system-text').html("File System: <strong>" + fileSystem.name + "</strong> " +
            "Root: <strong>" + fileSystem.root.name + "</strong>");
    fileSystem.root.getFile("moso.txt", {create: true, exclusive: false}, createGotFileEntry, writeFail);
}
function createFile(pais, operadora, numUser) { // button onclick function
	paramPais = pais;
	paramOperadora = operadora;
	paramNumUser = numUser;

    if (myFS) {
        gotFS(myFS);
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
    }
}

//api-file  FileWriter
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("Inicio");
        $('#file-contents').html("<br/>Contents: {pais: '" + paramPais + "', operadora: '" + paramOperadora + "', numuser: '" + paramNumUser + "'}");
        //writer.truncate(11);  
        /*writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            $('#file-contents').html("<br/>Contents: <strong>some sample</strong>");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
                $('#file-contents').html("<br/>Contents: <strong>some different text</strong>");
            };
        };*/
    };
	//writer.truncate(0);
    writer.write("{pais: " + paramPais + ", operadora: " + paramOperadora + ", numuser: '" + paramNumUser + "', activacion : 0}");
	location.href = "activacion.html";
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writeFail);
}
function writeFile() { // button onclick function
    if (myFileEntry) {
        gotFileEntry(myFileEntry);        
    } else {
        $('#file-status').html("Status: <strong>Error: File Not Created!</strong>");
    }
}



