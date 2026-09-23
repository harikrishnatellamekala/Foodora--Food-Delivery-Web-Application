const cartKey = "spicefitCart";

function updateCartCount(){
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(cartKey)) || []; } catch(e){}
  const count = cart.reduce((sum,item) => sum + Number(item.qty || item.quantity || 1), 0);
  document.querySelector("#cartCount").textContent = count;
}
updateCartCount();

const menuBtn = document.querySelector("#menuBtn");
const mobileNav = document.querySelector("#mobileNav");
menuBtn?.addEventListener("click", () => mobileNav.classList.toggle("open"));

const cards = [...document.querySelectorAll(".restaurant-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const emptyState = document.querySelector("#emptyState");

function applyFilter(filter){
  let visible = 0;
  cards.forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.style.display = show ? "" : "none";
    if(show) visible++;
  });
  emptyState.style.display = visible ? "none" : "block";
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});

cards.forEach(card => {
  card.addEventListener("click", () => {
    const name = encodeURIComponent(card.dataset.restaurant);
    const location = encodeURIComponent(card.dataset.location);
    window.location.href = `./menu.html?restaurant=${name}&location=${location}`;
  });
});
