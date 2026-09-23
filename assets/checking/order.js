/* ==========================================
   SPICEFIt ORDER PAGE
========================================== */

const ORDER_KEY = "spicefitOrders";
const CART_KEY = "spicefitCart";


/* ==========================================
   GET ORDERS
========================================== */

function getOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(ORDER_KEY)
        ) || [];

    } catch (error) {

        return [];

    }

}


/* ==========================================
   GET CART COUNT
========================================== */

function updateCartCount() {

    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];

    } catch (error) {

        cart = [];

    }


    const count = cart.reduce(
        (total, item) =>
            total + Number(
                item.quantity ||
                item.qty ||
                0
            ),
        0
    );


    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = count;

    }

}


/* ==========================================
   FORMAT PAYMENT METHOD
========================================== */

function formatPayment(method) {

    const payment = String(
        method || ""
    ).toLowerCase();


    if (payment === "upi") {

        return "UPI";

    }

    if (payment === "card") {

        return "Card";

    }

    if (
        payment === "cod" ||
        payment === "cash"
    ) {

        return "Cash on Delivery";

    }

    return method || "Not Available";

}


/* ==========================================
   FORMAT PRICE
========================================== */

function price(value) {

    return `₹${Number(value || 0).toLocaleString("en-IN")}`;

}


/* ==========================================
   RENDER CURRENT ORDER
========================================== */

function renderCurrentOrder(order) {

    const currentSection =
        document.getElementById(
            "currentOrderSection"
        );

    if (!currentSection || !order) {

        return;

    }


    document.getElementById(
        "orderId"
    ).textContent =
        order.id || "N/A";


    document.getElementById(
        "paymentMethod"
    ).textContent =
        formatPayment(order.paymentMethod);


    document.getElementById(
        "orderStatus"
    ).textContent =
        order.status || "Order Placed";


    document.getElementById(
        "itemTotal"
    ).textContent =
        price(order.itemTotal);


    document.getElementById(
        "deliveryFee"
    ).textContent =
        price(order.deliveryFee || 40);


    document.getElementById(
        "platformFee"
    ).textContent =
        price(order.platformFee || 5);


    document.getElementById(
        "total"
    ).textContent =
        price(order.total);


    renderCurrentItems(order.items || []);

}


/* ==========================================
   CURRENT ORDER ITEMS
========================================== */

function renderCurrentItems(items) {

    const container =
        document.getElementById(
            "orderItems"
        );

    const countElement =
        document.getElementById(
            "itemCount"
        );


    if (!container) return;


    container.innerHTML = "";


    let totalQuantity = 0;


    if (!items.length) {

        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-icon">🍽️</div>
                <h2>No items found</h2>
                <p>This order does not contain any items.</p>
            </div>
        `;

        return;

    }


    items.forEach(item => {

        const quantity =
            Number(
                item.quantity ||
                item.qty ||
                1
            );


        totalQuantity += quantity;


        const itemTotal =
            Number(item.price || 0) *
            quantity;


        const image =
            item.image ||
            "./images/project_images/project_images/morning/idly.jfif";


        const description =
            item.description ||
            item.restaurant ||
            "Delicious food from SpiceFit";


        const div =
            document.createElement("div");


        div.className =
            "order-item";


        div.innerHTML = `

            <img
                src="${image}"
                alt="${item.name || "Food"}"
                onerror="this.style.display='none'"
            >

            <div class="order-item-info">

                <h3>
                    ${item.name || "Food Item"}
                </h3>

                <p>
                    ${description}
                </p>

            </div>

            <span class="order-item-qty">
                × ${quantity}
            </span>

            <strong class="order-item-price">
                ${price(itemTotal)}
            </strong>

        `;


        container.appendChild(div);

    });


    if (countElement) {

        countElement.textContent =
            `${totalQuantity} ${
                totalQuantity === 1
                    ? "item"
                    : "items"
            }`;

    }

}


/* ==========================================
   RENDER ALL ORDERS
========================================== */

function renderAllOrders(orders) {

    const container =
        document.getElementById(
            "ordersList"
        );


    if (!container) return;


    container.innerHTML = "";


    if (!orders.length) {

        container.innerHTML = `

            <div class="empty-orders">

                <div class="empty-icon">
                    🍴
                </div>

                <h2>
                    No orders yet
                </h2>

                <p>
                    Your delicious orders will appear here.
                </p>

                <a
                    href="restaurants.html"
                    class="primary-btn"
                >
                    Explore Restaurants
                </a>

            </div>

        `;

        return;

    }


    /*
       Latest order first
    */

    [...orders]
        .reverse()
        .forEach(order => {

            const items =
                order.items || [];


            let totalQuantity = 0;


            items.forEach(item => {

                totalQuantity += Number(
                    item.quantity ||
                    item.qty ||
                    1
                );

            });


            const itemNames =
                items
                    .map(item => {

                        const quantity =
                            Number(
                                item.quantity ||
                                item.qty ||
                                1
                            );

                        return `
                            ${item.name}
                            ×${quantity}
                        `;

                    })
                    .join(", ");


            const card =
                document.createElement("div");


            card.className =
                "order-history-card";


            card.innerHTML = `

                <div class="order-history-top">

                    <div>

                        <div class="order-history-id">
                            ${order.id || "Order"}
                        </div>

                        <small>
                            ${order.date || ""}
                        </small>

                    </div>

                    <span class="order-status">
                        ${order.status || "Order Placed"}
                    </span>

                </div>


                <div class="order-history-items">

                    <strong>
                        ${totalQuantity}
                        ${totalQuantity === 1 ? "item" : "items"}
                    </strong>

                    <br>

                    ${itemNames || "Food items"}

                    <br>

                    <span>
                        Payment:
                        ${formatPayment(order.paymentMethod)}
                    </span>

                </div>


                <div class="order-history-bottom">

                    <div>

                        <small>
                            Total Amount
                        </small>

                        <div class="order-history-total">
                            ${price(order.total)}
                        </div>

                    </div>


                    <a
                        href="order.html?id=${encodeURIComponent(order.id)}"
                        class="view-order"
                    >
                        View Order →
                    </a>

                </div>

            `;


            container.appendChild(card);

        });

}


/* ==========================================
   PAGE MODE
========================================== */

function initializePage() {

    updateCartCount();


    const orders =
        getOrders();


    const params =
        new URLSearchParams(
            window.location.search
        );


    const orderId =
        params.get("id");


    const currentSection =
        document.getElementById(
            "currentOrderSection"
        );


    const allOrdersSection =
        document.getElementById(
            "allOrdersSection"
        );


    /*
       CASE 1:
       order.html?id=SF123
    */

    if (orderId) {

        const order =
            orders.find(
                item =>
                    String(item.id) ===
                    String(orderId)
            );


        if (!order) {

            currentSection.innerHTML = `

                <div class="empty-orders">

                    <div class="empty-icon">
                        😕
                    </div>

                    <h2>
                        Order Not Found
                    </h2>

                    <p>
                        We couldn't find this order.
                    </p>

                    <a
                        href="restaurants.html"
                        class="primary-btn"
                    >
                        Order Food
                    </a>

                </div>

            `;

            allOrdersSection.style.display =
                "none";

            return;

        }


        renderCurrentOrder(order);


        /*
           Hide My Orders list
           when viewing one order
        */

        allOrdersSection.style.display =
            "none";


        return;

    }


    /*
       CASE 2:
       order.html
       → My Orders
    */

    currentSection.style.display =
        "none";


    renderAllOrders(orders);

}


/* ==========================================
   START
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializePage
);