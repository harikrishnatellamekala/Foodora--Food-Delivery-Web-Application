document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "spicefitCart";
    const ORDER_KEY = "spicefitOrders";


    const cart =
        JSON.parse(
            localStorage.getItem(
                CART_KEY
            )
        ) || [];


    const summaryItems =
        document.getElementById(
            "summaryItems"
        );


    const summaryTotal =
        document.getElementById(
            "summaryTotal"
        );


    const finalTotal =
        document.getElementById(
            "finalTotal"
        );


    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (!Array.isArray(cart) || cart.length === 0) {

        summaryItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        summaryTotal.textContent =
            "₹0";

        finalTotal.textContent =
            "₹0";

        return;

    }


    /* =====================================================
       CALCULATE ITEM TOTAL
    ===================================================== */

    let itemTotal = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        const amount =
            price * quantity;


        itemTotal +=
            amount;


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "summary-item";


        div.innerHTML = `

            <span>
                ${item.name} × ${quantity}
            </span>

            <strong>
                ₹${amount}
            </strong>

        `;


        summaryItems.appendChild(
            div
        );

    });


    /* =====================================================
       FINAL CALCULATION
    ===================================================== */

    const deliveryFee =
        40;


    const platformFee =
        5;


    const grandTotal =
        itemTotal +
        deliveryFee +
        platformFee;


    summaryTotal.textContent =
        `₹${itemTotal}`;


    finalTotal.textContent =
        `₹${grandTotal}`;


    /* =====================================================
       PAYMENT METHOD
    ===================================================== */

    const paymentInputs =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    const upiBox =
        document.getElementById(
            "upiBox"
        );


    const cardBox =
        document.getElementById(
            "cardBox"
        );


    paymentInputs.forEach(
        input => {

            input.addEventListener(
                "change",
                () => {

                    upiBox?.classList.add(
                        "hidden"
                    );

                    cardBox?.classList.add(
                        "hidden"
                    );


                    if (
                        input.value === "upi"
                    ) {

                        upiBox?.classList.remove(
                            "hidden"
                        );

                    }


                    if (
                        input.value === "card"
                    ) {

                        cardBox?.classList.remove(
                            "hidden"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    const placeOrderBtn =
        document.getElementById(
            "placeOrderBtn"
        );


    placeOrderBtn?.addEventListener(
        "click",
        () => {


            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;

            }


            /* =============================================
               CREATE ORDER
            ============================================== */

            const order = {

                id:
                    "SF" +
                    Date.now()
                        .toString()
                        .slice(-8),

                items:
                    cart,

                itemTotal:
                    itemTotal,

                deliveryFee:
                    deliveryFee,

                platformFee:
                    platformFee,

                total:
                    grandTotal,

                paymentMethod:
                    selectedPayment.value,

                status:
                    "Order Placed",

                date:
                    new Date()
                        .toLocaleString()

            };


            /* =============================================
               GET OLD ORDERS
            ============================================== */

            let orders = [];


            try {

                orders =
                    JSON.parse(
                        localStorage.getItem(
                            ORDER_KEY
                        )
                    ) || [];

            } catch {

                orders = [];

            }


            if (!Array.isArray(orders)) {

                orders = [];

            }


            /* NEW ORDER FIRST */

            orders.unshift(order);


            /* SAVE ORDERS */

            localStorage.setItem(
                ORDER_KEY,
                JSON.stringify(orders)
            );


            /* CLEAR CART */

            localStorage.removeItem(
                CART_KEY
            );


            /* GO TO ORDER PAGE */

            window.location.href =
                `order.html?id=${encodeURIComponent(order.id)}`;

        }
    );

});