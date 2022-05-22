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
    //-- console.log("Esto es url:",url);

    //-- Constantes de la respuesta
    let code = 200;
    let code_msg = "OK";

    let file = "";
});
