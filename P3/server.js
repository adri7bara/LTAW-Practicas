const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const PUERTO = 8000;

//-- Crear una nueva aplicacion web
const app = express();

//-- Crear un servidor de la app de express
const server = http.Server(app);

//-- Servidor de websockets, asociado al servidor http
const io = socket(server);

//-- Usuarios que estan conectados.
let contador = 0;

let todo = "<br>";

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  path = __dirname +"/public/client.html";
  res.sendFile(path);
});

//-- Servidor envía al cliente la biblioteca socket.io
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//-- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  contador += 1;
  socket.send("Bienvenido al chat");
  console.log('** NUEVA CONEXIÓN **'.yellow);
  io.send("Se ha metido un nuevo usuario");
  //-- Desconexión
  socket.on('disconnect', function(){
    contador -= 1;
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos
  socket.on("message", (msg,)=> {
    const myset = new Set();
    const mensajedividido = msg.split(" ");
    const nick = msg.split(":")[0];
    const contenido = mensajedividido[1];
    
    if (todo.includes(nick)){
      console.log("")
    }else{
      todo += "&nbsp&nbsp&nbsp" + nick + "<br>"
    }


    console.log("Mensaje Recibido!: " + msg.blue);
    if(contenido.charAt(0)=="/"){
      if(contenido == "/help"){
        socket.send("Comandos soportados:<br>" + "<u><n>/help:Comando utilizado<n/></u><br>" +
                    "<u><n>/list:Numero de usuarios conectados<n/></u><br>" + "<u><n>/hello:EL server te saluda<n/></u><br>" +
                    "<u><n>/date:Fecha y hora<n/></u><br>" + "<u><n>/usuario:Usuarios que han participado en la sesión<n/></u><br>")
        console.log("estamos en help", msg);
      }else if(contenido == "/list"){
        socket.send("Numero de usuarios conectados: " + contador);
      }else if(contenido == "/hello"){
        console.log("estamos en hello", msg);
        socket.send("Hola");
      }else if(contenido == "/date"){
        socket.send(Date());
        console.log("/date", Date());
      }else if(contenido == "/usuarios"){
        console.log("/usuarios", todo);
        socket.send("Usuarios que han participado en esta sesión:" + todo);

      }else{
        socket.send(msg);
      }
    }else{
      io.send(msg);
    }

    //-- Reenviarlo a todos los clientes conectados
    
  });
});
//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Static file server running at\n  => http://localhost:" 
            + PUERTO + "/\nCTRL + C to shutdown");