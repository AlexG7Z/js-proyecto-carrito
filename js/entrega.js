const productos = [
    { id: 1, nombre: 'Placa Base 1200 ASUS ROG STRIX', precio: 120000, imagen: 'https://www.jib.co.th/img_master/product/original/20200507144526_38752_21_1.jpg' },
    { id: 2, nombre: 'Procesador Intel i7', precio: 95000, imagen: 'https://http2.mlstatic.com/D_NQ_NP_735461-MLU78928920096_092024-O.webp' },
    { id: 3, nombre: 'Memoria RAM Corsair 16GB', precio: 45000, imagen: 'https://fullh4rd.com.ar/img/productos/4/memoria-16gb-ddr4-3200-kingston-fury-beast-0.jpg' },
    { id: 4, nombre: 'Tarjeta Grafica NVIDIA RTX 3080', precio: 250000, imagen: 'https://m.media-amazon.com/images/I/71ZmRXZcnXS._AC_SL1500_.jpg' },
    { id: 5, nombre: 'SSD Kingston 1TB', precio: 80000, imagen: 'https://www.comeros.com.ar/wp-content/uploads/2020/02/ktc-product-ssd-kc600-1024gb-3-zm-lg.jpg' },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: auto;">
            <h4>${producto.nombre} - $${producto.precio}</h4>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemCarrito = carrito.find(item => item.id === productoId);
    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>El carrito esta vacio.</p>';
        return;
    }
    carrito.forEach(item => {
        carritoDiv.innerHTML += `
            <p>
                ${item.nombre} - $${item.precio} x ${item.cantidad}
                <button class="botonEliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </p>
        `;
    });
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

document.getElementById('botonCheckout').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito esta vacio. Agrega productos para realizar el pago.');
        return;
    }
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
    alert('Compra realizada con exito');
});

window.onload = function() {
    mostrarProductos();
    mostrarCarrito();
};
