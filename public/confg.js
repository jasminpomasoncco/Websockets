function validateForm() {
    let x = document.forms["agregarproductos"]["title"].value;
    let y = document.forms["agregarproductos"]["price"].value;
    let z = document.forms["agregarproductos"]["thumbnail"].value;
   
    if (z == "" || x == "" ||y=="" ) {
        alert("Complete los datos del producto");
        return false;
      } 
}

function getProductById() {
    let id = document.getElementById('id').value ;
    let form = document.getElementById('getProductById');
    form.setAttribute('action', '/api/products/' + id);
}

let email = sessionStorage.getItem('email')
if(email == null) {
    email = prompt('Insert email : ')
    sessionStorage.setItem('email', email)
}

document.getElementById('email').innerHTML = `Se registró con : ${email}`
const socket = io()
loadFirstData()

//------------------

const boton = document.getElementById('send')
boton.onclick = e => {
    e.preventDefault()
    const mensaje = document.getElementById('sms').value
    socket.emit('chat-in', {mensaje, email})
}

socket.on('chat-out', message => {
    addDataToDiv(message)
})

function addDataToDiv(message) {
    const div = document.getElementById('chat')
    div.innerHTML += `<p><label class= "email">${message.email}</label><label class= "date">[${message.date}] </label> :<label class= "sms"> ${message.sms}</label></p>`
}

function loadDataToDiv(message) {
    console.log(message);
    message.forEach(d => addDataToDiv(d))
}


function loadFirstData() {
    fetch('/api/products')
        .then(message => message.json())
        .then(d => {
            loadDataToDiv(d.message)
        })
        .catch(e => alert(e))
}

