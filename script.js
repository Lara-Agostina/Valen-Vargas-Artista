document.addEventListener('DOMContentLoaded', () => {
    let cart = []; 
    const cartButton = document.getElementById('cart-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function updateCartCount() {
        // Calcula la suma total de las cantidades de todos los ítems
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartButton.textContent = `🛒 (${totalItems})`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            // Asegúrate de parsear el precio como un número flotante
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            console.log("Carrito Actual:", cart);
            alert(`${name} añadido al carrito de SAHKINI.`);
            updateCartCount(); 
        });
    });

    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    let cart = []; // Array principal para el carrito
    
    // Referencias a elementos del DOM
    const cartButton = document.getElementById('cart-button'); // Botón del header
    const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Botones de producto
    const modal = document.getElementById('cart-modal'); // La ventana modal
    const closeBtn = document.querySelector('.close-btn'); // El botón 'x' de cerrar
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // --- FUNCIÓN DE UTILIDAD ---
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartButton.textContent = `🛒 (${totalItems})`;
    }

    // --- FUNCIÓN PRINCIPAL PARA DIBUJAR EL CARRITO ---
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Limpia el contenido anterior
        let cartTotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                cartTotal += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>
                        $${itemTotal.toFixed(2)}
                        <button class="remove-item-btn" data-id="${item.id}">Quitar</button>
                    </span>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        // Actualiza el total y el contador del header
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        updateCartCount();
    }

    // --- MANEJO DEL BOTÓN AÑADIR AL CARRITO ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            
            // Renderiza el carrito para que se actualice la modal si está abierta
            renderCart(); 
            // Opcional: abre la modal automáticamente después de añadir
            modal.style.display = 'block'; 
        });
    });

    // --- MANEJO DEL BOTÓN QUITAR DEL CARRITO ---
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const idToRemove = e.target.getAttribute('data-id');
            
            // Filtra el carrito para crear una nueva lista sin el producto
            cart = cart.filter(item => item.id !== idToRemove);
            
            renderCart(); // Vuelve a dibujar el carrito
        }
    });

    // --- MANEJO DE LA MODAL ---
    
    // 1. Abrir modal al hacer clic en el botón del carrito
    cartButton.addEventListener('click', () => {
        renderCart(); // Asegura que el contenido esté actualizado
        modal.style.display = 'block';
    });

    // 2. Cerrar modal con el botón 'x'
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 3. Cerrar modal al hacer clic fuera de ella
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Inicializar el conteo del carrito al cargar la página
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATOS DEL CATÁLOGO DE PRODUCTOS (¡CLAVE!) ---
    // Agrega aquí todos los detalles de tus productos, incluyendo varias imágenes
    const productCatalog = [
        {
            id: '1',
            name: 'Bikini Serene',
            price: 120.00,
            description: 'El clásico atemporal con un toque moderno. Tela de secado rápido y doble forro para máxima comodidad y soporte.',
            images: [
                'images/bikini1.jpg', // Imagen principal
                'images/bikini1_thumb1.jpg', 
                'images/bikini1_thumb2.jpg'
            ],
            options: ['Talla S', 'Talla M', 'Talla L']
        },
        {
            id: '2',
            name: 'Traje de Baño Aura',
            price: 150.00,
            description: 'Elegancia de una pieza con escote pronunciado y cintura ajustada. Ideal para un look sofisticado en la piscina o la playa.',
            images: [
                'images/bikini2.jpg',
                'images/bikini2_thumb1.jpg'
            ],
            options: ['Talla XS', 'Talla S', 'Talla M']
        }
        // Agrega más productos aquí
    ];

    // --- 2. REFERENCIAS A ELEMENTOS DEL DOM ---
    let cart = []; // Array principal para el carrito
    
    // Elementos del carrito
    const cartButton = document.getElementById('cart-button'); 
    const cartModal = document.getElementById('cart-modal'); 
    const cartCloseBtn = document.querySelector('.close-btn'); 
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Elementos del detalle de producto
    const productDetailModal = document.getElementById('product-detail-modal');
    const detailCloseBtn = document.querySelector('.detail-close-btn');
    const productDetailContainer = document.getElementById('product-detail-container');

    // Botones de las tarjetas de producto (para abrir la modal de detalle)
    const productCards = document.querySelectorAll('.product-card');

    // --- 3. FUNCIONES DEL CARRITO (REUTILIZADAS) ---

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartButton.textContent = `🛒 (${totalItems})`;
    }

    function renderCart() {
        // ... (el resto de la lógica de renderCart() es la misma que la anterior) ...
        cartItemsContainer.innerHTML = ''; 
        let cartTotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                cartTotal += itemTotal;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>
                        $${itemTotal.toFixed(2)}
                        <button class="remove-item-btn" data-id="${item.id}">Quitar</button>
                    </span>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        updateCartCount();
    }

    // Lógica para añadir producto desde la modal de detalle
    function handleAddToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        renderCart(); 
        alert(`${name} añadido al carrito de SAHKINI.`);
        productDetailModal.style.display = 'none'; // Cierra la modal de detalle
    }

    // --- 4. FUNCIONES DE DETALLE DE PRODUCTO ---

    function renderProductDetail(product) {
        // Construye las opciones de talla/opción
        const optionsHtml = product.options.map(option => 
            `<option value="${option}">${option}</option>`
        ).join('');
        
        // Construye las miniaturas de la galería
        const thumbnailsHtml = product.images.map((imgUrl, index) => 
            `<img src="${imgUrl}" alt="Miniatura ${index + 1}" data-full-image="${imgUrl}">`
        ).join('');

        productDetailContainer.innerHTML = `
            <div class="image-gallery">
                <img id="main-image" src="${product.images[0]}" alt="${product.name}">
                <div class="thumbnails">${thumbnailsHtml}</div>
            </div>
            <div class="product-info-detail">
                <h3 class="detail-title">${product.name}</h3>
                <p class="detail-price">$${product.price.toFixed(2)}</p>
                <p class="detail-description">${product.description}</p>
                <div class="options">
                    <select id="size-selector">
                        <option value="" disabled selected>Selecciona Talla</option>
                        ${optionsHtml}
                    </select>
                </div>
                <button id="detail-add-btn" 
                        class="add-to-cart luxury-cta"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}">
                    Añadir al Carrito
                </button>
            </div>
        `;
        
        // Lógica de la Galería (Cambiar imagen principal al hacer clic en miniatura)
        const mainImage = document.getElementById('main-image');
        productDetailContainer.querySelectorAll('.thumbnails img').forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.getAttribute('data-full-image');
            });
        });

        // Lógica para el botón "Añadir al Carrito" dentro de la modal de detalle
        document.getElementById('detail-add-btn').addEventListener('click', (e) => {
            // Aquí podrías validar si se seleccionó una talla antes de añadir
            const selectedSize = document.getElementById('size-selector').value;
            if (!selectedSize) {
                 alert('Por favor, selecciona una talla.');
                 return;
            }
            
            handleAddToCart(
                e.currentTarget.getAttribute('data-id'), 
                e.currentTarget.getAttribute('data-name'), 
                parseFloat(e.currentTarget.getAttribute('data-price'))
            );
        });

        productDetailModal.style.display = 'block'; // Mostrar la modal
    }

    // --- 5. MANEJO DE EVENTOS ---
    
    // Evento: Al hacer clic en la tarjeta de producto, abrir la modal de detalle
    productCards.forEach(card => {
        // Asignamos el evento al área de la imagen para que al hacer clic en la foto, se abra el detalle
        const cardImage = card.querySelector('img'); 
        if (cardImage) {
            cardImage.addEventListener('click', () => {
                const productId = card.querySelector('.add-to-cart').getAttribute('data-id');
                const product = productCatalog.find(p => p.id === productId);
                if (product) {
                    renderProductDetail(product);
                }
            });
        }
    });

    // Evento: Al hacer clic en el botón Añadir al Carrito (de la tarjeta principal)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        // Previene la acción por defecto para evitar problemas al hacer clic en la tarjeta
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            handleAddToCart(
                e.currentTarget.getAttribute('data-id'), 
                e.currentTarget.getAttribute('data-name'), 
                parseFloat(e.currentTarget.getAttribute('data-price'))
            );
        });
    });

    // Evento: Abrir Modal del Carrito
    cartButton.addEventListener('click', () => {
        renderCart(); 
        cartModal.style.display = 'block';
    });

    // Evento: Cerrar Modal del Carrito
    cartCloseBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Evento: Cerrar Modal de Detalle
    detailCloseBtn.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
    });

    // Evento: Cerrar cualquier Modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target == productDetailModal) {
            productDetailModal.style.display = 'none';
        }
    });
    
    // Inicializar
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código actual de productCatalog, referencias DOM, etc.) ...

    // --- NUEVA LÓGICA PARA EL CAMBIO DE IMAGEN AL HOVER ---
    const productImages = document.querySelectorAll('.product-card img');

    productImages.forEach(img => {
        const originalSrc = img.getAttribute('data-original-src');
        const hoverSrc = img.getAttribute('data-hover-src');

        if (hoverSrc) { // Solo si hay una imagen para hover
            // Pre-cargar la imagen de hover para una transición suave
            const preloader = new Image();
            preloader.src = hoverSrc;

            img.addEventListener('mouseover', () => {
                img.src = hoverSrc;
            });

            img.addEventListener('mouseout', () => {
                img.src = originalSrc;
            });
        }
    });

    // ... (El resto de tu código de carrito y modales) ...
});