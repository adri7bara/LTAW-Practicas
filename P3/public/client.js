//-- Tipos de entrada
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const cambio = document.getElementById("cambio");

//-- Websocket
socket.on("message", (msg)=>{
    display.innerHTML +=  '<p>' + msg + '</p>';
    notificacion.play();
  });

//-- Se envía un mensaje al servidor
msg_entry.onchange = () => {
    if (msg_entry.value)
      socket.send(nombreUsuario + ": " + msg_entry.value);
    msg_entry.value = "";
  }