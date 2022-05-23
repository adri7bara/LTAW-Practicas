//-- Tipos de entrada
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const cambio = document.getElementById("cambio");
const usuario = document.getElementById("nick");
const socket = io();
let nombreUsuario = "Unknown";


//-- Websocket
socket.on("message", (msg)=>{
  display.innerHTML +=  '<p>' + msg + '</p>';
});

//-- Se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(nombreUsuario + ": " + msg_entry.value);
    msg_entry.value = "";
}

//-- Al apretar el botón otorga el nombre de ususario
usuario.onchange = () => {
  if (usuario.value )
  nombreUsuario = usuario.value;
  console.log("nombre usuario"+ usuario.value);
  document.getElementById("nick").style.display = "none";
  cambio.innerHTML = "USUARIO:" + nombreUsuario;
}