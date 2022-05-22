//--  Acceso a todos los elementos del módulo http.
const http = require('http');
//-- Importar modulo fs
const fs = require('fs');
//-- Importar url
const url = require('url');
//-- Importar el modulo path  
var path = require('path');
//-- El servidor debe escuchar en el puerto 9090
const PUERTO = 9090;

console.log("Servidor iniciado:")

const server = http.createServer(function(req, res){

    console.log("Petición recibida!");

    //-- Analizar el recurso
    //-- Construir el objeto url 
    const url = new URL(req.url, 'http://' + req.headers['host']);

    //-- Constantes de la respuesta
    let code = 200;
    let code_msg = "OK";

    let file = "";

    if(url.pathname == '/'){
        file += "index.html"; 
    }else{
        file +=  url.pathname.substr(1);
        //-- Le quitamos '/' porque el nombre de nuestro archivo no tiene '/'.
    }

    const contentTypesExtensions = {
        ".html":       "text/html",
        ""     :       "text/html",
        ".css" :        "text/css",
        ".js"  : "text/javascript",
        ".ico" :     "image/x-icon"
    };
    var extension = path.extname(file);
    var contentType = "";
    console.log("Extensión:", extension);

    //-- Aunque se escriba mal la direccion el servido sigue funcionando
    if (extension in  contentTypesExtensions){
        contentType = contentTypesExtensions[path.extname(file)]
    }else{
        console.log("La extension: "+ extension + "  NO es valida");
        contentType = contentTypesExtensions[path.extname("paginaerror.html")];
    }
    console.log("contentType",contentType)
    console.log("file",file)

    fs.readFile(file, function(err, data) {
    
        if (file == "ls") { 
            var numFile ="";
            fs.readdir("./", function(err, carpeta) {
                var contenido ="Listado de todos los archivos" + "\n" + "<br>" + "\n";
                res.statusCode = code;
                res.statusMessage = code_msg;
                res.setHeader('Content-Type', contentType);
                if (err){
                    console.log("Error!!" + err.message);
                }
                numFile = carpeta.length
                for(i = 0; i< numFile; i++){
                    contenido = contenido += ("&nbsp&nbsp&nbsp&nbsp Archivo"+ (i+1) + 
                                              ": " + carpeta[i] + "\n" + "<br>" + "\n");
                }
                res.write(contenido)
                fs.writeFileSync("ls.html", contenido);
                console.log("Estamos aquí")
                res.end()

            });
        }else if (err || file == "paginaerror.html"){
            //--No encontrado. Mensaje de error.
            code = 404;
            code_msg = "Not Found";
            data =fs.readFileSync("paginaerror.html");
            console.log("Error!!" + err.message);
            res.statusCode = code;
            res.statusMessage = code_msg;

            res.setHeader('Content-Type', contentType);
            
            res.write(data);
            res.end();
        }else {
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        }
    });

});

server.listen(PUERTO);
console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");