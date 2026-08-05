// Smooth fade-in animation
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.15
});

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});

// Header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";
  } else {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,.15)";
  }
});

// Welcome message
window.onload = () => {
  console.log("Welcome to NOORRANEMPIRES");
}
// Shopping Cart Functions
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    alert(name + " has been added to your cart!");
}

function buyNow(name, price) {
    alert(
        "Buying: " + name +
        "\nPrice: Rs. " + price +
        "\n\nCheckout page coming soon."
    );
}
