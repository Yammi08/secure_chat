# Secure_chat
### funciones
desarrollo de un chat web que permite conectar a multiples usuarios en un canal global, este cuenta con:
1. conexion bidireccional en un chat global usando websocket como libreria `socket.io` la cual se implementa tanto en el lado del cliente como en el del servidor.
2. encriptacion de contraseñas usando el algoritmo Blowfish proporcionado por `bcrypt` para garantizar el almacenamiento seguro.
3. creacion de session ID usando `crypto` y manejo de las sesiones por medio de express-session
4. manejo de sesiones mediante id y configuracion de cookies con `cookie-parser` las cuales cuentan con *httponly* desactivado intencionalmente para permitir el acesso por el lado del front end cuando se necesite
5. uso de base de datos *sql* debido a la naturaleza del proyecto al ser algo pequeño.
### instalacion
```
git clone git@github.com:Yammi08/secure_chat.git
npm install
npm run dev # en caso de querer iniciar el modo developer
```
