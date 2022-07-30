
//-------------------------
const socket = io()
loadFirstData()

//------------------

const agregarproduct = document.getElementById('createproduct')
agregarproduct.addEventListener ('submit', (e)  => {
    e.preventDefault();
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());
    socket.emit('crearproduct', product);
});

const newsms = document.getElementById('chatsms')
newsms.addEventListener('submit', (e)  => {
    e.preventDefault();
    const inputchat = new FormData(e.target);
    const mensaje = Object.fromEntries(inputchat);
    socket.emit('addmessage', mensaje);
});



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
    const listproducts = document.getElementById('listproducts');

    products.forEach((product) => {
        listproducts.innerHTML += `<tr>
                                <td>${product.title} </td>
                                <td> S/.${product.price} </td>
                                <td> <img width="40px" src=" ${product.thumbnail}"/></td>
                            </tr>
                            `;
    });

}


function loadMessagesToChat(messages) {
    const chats = document.getElementById('messages');
    messages.forEach((message) => {
        chats.innerHTML += `
        <br> <b style="color:blue"> ${message.email} </b> <b style="color:maroon">${message.date}</b>: <i style="color:green">${message.message}</i>
        `;
    });
}
