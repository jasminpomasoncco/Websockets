function validateForm() {
    let x = document.forms["agregarproductos"]["title"].value;
    let y = document.forms["agregarproductos"]["price"].value;
    let z = document.forms["agregarproductos"]["thumbnail"].value;
   
    if (z == "" || x == "" ||y=="" ) {
        alert("Complete los datos del producto nuevo");
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

//-------------------------
const socket = io()
loadFirstData()

//------------------

