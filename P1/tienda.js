//-- El servidor de mi tienda


//-- * Fichero .html
//-- * Ficheros con imagenes (.jpg, .png)
//-- * Ficheros .css
//-- Devolver el fichero pedido
//-- Si no localizo el fichero: PAGINA DE ERROR

//-- CREAR UN SERVIDOR
//-- Se llama a la funcion de retrollamada cada vez que hay una petición

    //-- Localizar el recurso que nos piden (sacarlo por la consola)
    //-- OBTENER el nombre del fichero válido
    
    //-- LECTURA AÍNCRONA del fichero
        //-- Funcion de retrollamada de lectura

        //-- Imprimir en la consola el nombre del fichero que estoy leyendo

        //-- Si hay error, generar la página html de error
        //-- Si no hay error
            
            //-- Devolver el contenido como respuesta
            //-- La respuesta depende del tipo de fichero
                //-- HTML: Cabecera: 'Content-Type', 'text/html'
                //-- IMAGEN: 'image/jpg', 'image/pnng'
                //-- CSS: 'text/css'
                //-- ¿Como puedo saber el tipo de fichero?
                //-- por la extension del fichero
                //-- Nombre del fichero: "index.html", "hola.jpg"
                //-- A partir del nombre del fichero, obtener su extensión: "html", "jpg", "png", "css"