document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "spicefitCart";


    /* =====================================================
       GET CART
    ===================================================== */

    function getCart() {

        try {

            const cart =
                JSON.parse(
                    localStorage.getItem(CART_KEY)
                ) || [];

            return Array.isArray(cart) ? cart : [];

        } catch (error) {

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

        updateCartCount();

    }


    /* =====================================================
       CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart = getCart();

        const count =
            cart.reduce(
                (total, item) => {

                    return total +
                        Number(item.quantity || 0);

                },
                0
            );


        const cartCount =
            document.getElementById("cartCount");


        if (cartCount) {

            cartCount.textContent = count;

        }

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    function addToCart(
        itemName,
        price,
        image,
        description,
        restaurant = "SpiceFit"
    ) {

        const cart = getCart();


        const itemPrice =
            Number(price);


        if (
            !itemName ||
            !Number.isFinite(itemPrice)
        ) {

            console.error(
                "Invalid cart item:",
                itemName,
                price
            );

            return;

        }


        /*
           SAME ITEM + SAME RESTAURANT
           = increase quantity
        */

        const existing =
            cart.find(
                item =>
                    item.name === itemName &&
                    item.restaurant === restaurant
            );


        if (existing) {

            existing.quantity =
                Number(existing.quantity || 0) + 1;

        } else {

            cart.push({

                name: itemName,

                price: itemPrice,

                quantity: 1,

                image: image || "",

                description:
                    description || "",

                restaurant:
                    restaurant,

                location: ""

            });

        }


        saveCart(cart);


        showToast(
            `${itemName} added to cart`
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        const toast =
            document.getElementById("toast");


        if (!toast) return;


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.spiceToastTimer
        );


        window.spiceToastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 1800);

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");


    const mobileNav =
        document.getElementById("mobileNav");


    mobileMenu?.addEventListener(
        "click",
        () => {

            mobileNav?.classList.toggle(
                "open"
            );

        }
    );


    /* =====================================================
       HORIZONTAL SCROLL
    ===================================================== */

    document
        .querySelectorAll(".scroll-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const track =
                        document.getElementById(
                            button.dataset.target
                        );


                    if (!track) return;


                    const amount =
                        Math.min(
                            760,
                            track.clientWidth * 0.8
                        );


                    track.scrollBy({

                        left:
                            button.dataset.direction === "right"
                                ? amount
                                : -amount,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       FOOD MODAL
    ===================================================== */

    const modal =
        document.getElementById("foodModal");


    const modalImage =
        document.getElementById(
            "modalFoodImage"
        );


    const modalName =
        document.getElementById(
            "modalFoodName"
        );


    const modalDescription =
        document.getElementById(
            "modalFoodDescription"
        );


    const modalPrice =
        document.getElementById(
            "modalFoodPrice"
        );


    const modalAdd =
        document.getElementById(
            "modalAdd"
        );


    const modalClose =
        document.getElementById(
            "modalClose"
        );


    let selectedItem = null;


    function openFoodModal(card) {

        selectedItem = {

            name:
                card.dataset.item,

            price:
                Number(card.dataset.price),

            image:
                card.dataset.image,

            description:
                card.dataset.description

        };


        if (modalImage) {

            modalImage.src =
                selectedItem.image;

            modalImage.alt =
                selectedItem.name;

        }


        if (modalName) {

            modalName.textContent =
                selectedItem.name;

        }


        if (modalDescription) {

            modalDescription.textContent =
                selectedItem.description;

        }


        if (modalPrice) {

            modalPrice.textContent =
                `₹${selectedItem.price}`;

        }


        modal?.classList.add("open");

        modal?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeFoodModal() {

        modal?.classList.remove("open");

        modal?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

        selectedItem = null;

    }


    /* =====================================================
       FOOD CARD CLICK
    ===================================================== */

    document
        .querySelectorAll(".food-card")
        .forEach(card => {


            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".add-button"
                        )
                    ) {

                        return;

                    }


                    openFoodModal(card);

                }
            );


            /*
               ONLY ONE ADD BUTTON LISTENER
            */

            card
                .querySelector(".add-button")
                ?.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        addToCart(

                            card.dataset.item,

                            card.dataset.price,

                            card.dataset.image,

                            card.dataset.description

                        );

                    }
                );

        });


    /* =====================================================
       MODAL ADD
    ===================================================== */

    modalAdd?.addEventListener(
        "click",
        () => {

            if (!selectedItem) return;


            addToCart(

                selectedItem.name,

                selectedItem.price,

                selectedItem.image,

                selectedItem.description

            );


            closeFoodModal();

        }
    );


    /* =====================================================
       MODAL CLOSE
    ===================================================== */

    modalClose?.addEventListener(
        "click",
        closeFoodModal
    );


    document
        .querySelector("[data-close-modal]")
        ?.addEventListener(
            "click",
            closeFoodModal
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("open")
            ) {

                closeFoodModal();

            }

        }
    );


    /* =====================================================
       HERO BUTTON
    ===================================================== */

    document
        .querySelector(".hero-button")
        ?.addEventListener(
            "click",
            event => {

                const target =
                    document.getElementById(
                        "morningTrack"
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });

                }

            }
        );


    /* =====================================================
       INITIAL COUNT
    ===================================================== */

    updateCartCount();

});