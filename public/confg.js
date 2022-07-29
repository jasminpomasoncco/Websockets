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
agregarproduct.onclick = e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('listproducts-in', {title : title, price:price,thumbnail:thumbnail})
}

socket.on('listproducts-out', data => {
    console.log(data);
    renderItem(data)
})

function renderItem(products) {
    const products = document.getElementById('listproducts')
        products.innerHTML += `
    <tr>
            <td>${product.id} </td>
            <td> S/. ${product.id}  </td>
            <td> <img width="40px" src=" ${product.id} "/></td>
    </tr>
    `;

}

function loadDataToDiv(products) {
    console.log(products);
    data.forEach(d => renderItem(d))
}

function loadFirstData() {
    fetch('/')
        .then((data) => data.json())
        .then((products) => {
            loadDataToDiv(products.products);
        })
        .catch((e) => alert(e));
}