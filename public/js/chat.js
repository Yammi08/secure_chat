(()=>{
const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
const getcookie = ()=>
{
  const resq = {};
  for(const items of document.cookie.split(';'))
  {
    const pair = items.split('=')
    resq[pair[0].trimStart()]= pair[1];

  }
  return resq
}
const cookies = getcookie()

function decoratemsg(mensaje)
{
  const fecha =  new Date(mensaje.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  user = mensaje.user == cookies['username']? 'message me':'message user'
  const msghtml = `
  <div class ='${user}'>
          <div class="message-header">
          ${mensaje.user} <span class="message-time">${fecha}</span>
        </div>
        <div>${mensaje.msg}</div>
  </div>`
  return msghtml
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('new message', {
      msg:input.value,
      user:cookies['iduser']
    });
    input.value = '';
  }
});
socket.on('mensajes_previos',(result)=>
{
  for(const item of result)
  {
    output.innerHTML += (decoratemsg({
      user:item.username,
      msg:item.mensaje,
      fecha: item.fecha}))
  }
})

socket.on('to message',(mensaje)=>
{
  output.innerHTML += (decoratemsg(mensaje))
})
socket.emit('start user',cookies['iduser'])
})()
