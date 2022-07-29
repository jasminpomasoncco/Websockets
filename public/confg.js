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

//-------------------------
const socket = io()
loadFirstData()

//------------------

const agregarproduct = document.getElementById('createproduct')
agregarproduct.addEventListener = e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());
    socket.emit('crearproduct', product);
}

const newsms = document.getElementById('chatsms')
newsms.addEventListener = e => {
    e.preventDefault();
    const chat = new FormData(e.target);
    const mensaje = Object.fromEntries(chat.entries());
    socket.emit('addmessage', mensaje);
}



socket.on('allproducts', (product) => {
    loadDataToTbody(product);
});

socket.on('allsms', (message) => {
    loadDataToTbody(message);
});

function loadFirstData() {
    fetch('/api/products')
        .then((data) => data.json())
        .then((products) => {
            loadDataToTbody(products.products);
        })
        .catch((e) => alert(e));

        fetch('/api/sms')
        .then((data) => data.json())
        .then((messages) => {
            loadMessagesToChat(messages.messages);
        })
        .catch((e) => alert(e));
}


function loadDataToTbody(products) {
    const productos = document.getElementById('listproducts');

    products.forEach((product) => {
        productos.innerHTML += `<tr>
                                <td>${product.title} </td>
                                <td>${product.price} </td>
                                <td> <img width="40px" src=" ${product.thumbnail}"/>/td>
                            </tr>
                            `;
    });

}


function loadMessagesToChat(messages) {
    const chats = document.getElementById('messages');
    messages.forEach((message) => {
        chats.innerHTML += `<br> <b style="color:blue"> ${message.email} </b> [<b style="color:maroon">${message.date}</b>]: <i style="color:green">${message.message}</i>`;
    });
}
