document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "spicefitCart";


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const emptyCart =
        document.getElementById(
            "emptyCart"
        );


    const itemTotalElement =
        document.getElementById(
            "itemTotal"
        );


    const grandTotalElement =
        document.getElementById(
            "grandTotal"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const proceedBtn =
        document.getElementById(
            "proceedBtn"
        );


    /* =====================================================
       GET CART
    ===================================================== */

    function getCart() {

        try {

            const cart =
                JSON.parse(
                    localStorage.getItem(
                        CART_KEY
                    )
                ) || [];


            return Array.isArray(cart)
                ? cart
                : [];

        } catch {

            return [];

        }

    }


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       COUNT
    ===================================================== */

    function updateCartCount(cart) {

        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 0),
                0
            );


        if (cartCount) {

            cartCount.textContent =
                count;

        }

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        const cart =
            getCart();


        cartItems.innerHTML = "";


        if (cart.length === 0) {

            emptyCart.style.display =
                "block";


            itemTotalElement.textContent =
                "₹0";


            grandTotalElement.textContent =
                "₹0";


            proceedBtn.disabled =
                true;


            updateCartCount(cart);

            return;

        }


        emptyCart.style.display =
            "none";


        proceedBtn.disabled =
            false;


        let itemTotal = 0;


        cart.forEach(
            (item, index) => {


                const price =
                    Number(item.price) || 0;


                const quantity =
                    Number(item.quantity) || 0;


                const amount =
                    price * quantity;


                itemTotal +=
                    amount;


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "cart-item";


                card.innerHTML = `

                    <img
                        class="cart-item-image"
                        src="${item.image || ""}"
                        alt="${item.name}"
                    >


                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.description || "Delicious food from SpiceFit"}
                        </p>

                        <div class="item-price">
                            ₹${price}
                        </div>

                    </div>


                    <div class="quantity-control">

                        <button
                            class="decrease-btn"
                            data-index="${index}">
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            class="increase-btn"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                `;


                cartItems.appendChild(
                    card
                );

            }
        );


        const deliveryFee =
            40;


        const platformFee =
            5;


        const grandTotal =
            itemTotal +
            deliveryFee +
            platformFee;


        itemTotalElement.textContent =
            `₹${itemTotal}`;


        grandTotalElement.textContent =
            `₹${grandTotal}`;


        updateCartCount(cart);

    }


    /* =====================================================
       PLUS
    ===================================================== */

    cartItems.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".increase-btn"
                );


            if (!button) return;


            const index =
                Number(
                    button.dataset.index
                );


            const cart =
                getCart();


            if (!cart[index]) return;


            cart[index].quantity =
                Number(
                    cart[index].quantity || 0
                ) + 1;


            saveCart(cart);

            renderCart();

        }
    );


    /* =====================================================
       MINUS
    ===================================================== */

    cartItems.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".decrease-btn"
                );


            if (!button) return;


            const index =
                Number(
                    button.dataset.index
                );


            const cart =
                getCart();


            if (!cart[index]) return;


            cart[index].quantity =
                Number(
                    cart[index].quantity || 0
                ) - 1;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(index, 1);

            }


            saveCart(cart);

            renderCart();

        }
    );


    /* =====================================================
       PROCEED TO PAYMENT
    ===================================================== */

    proceedBtn.addEventListener(
        "click",
        () => {

            const cart =
                getCart();


            if (cart.length === 0) {

                return;

            }


            window.location.href =
                "payment.html";

        }
    );


    renderCart();

});