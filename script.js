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
let cart = JSON.parse(localStorage.getItem("noorranCart")) || [];

function saveCart() {
    localStorage.setItem("noorranCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " has been added to your cart!");
}

function buyNow(name, price) {
    addToCart(name, price);

    alert(
        "Your item has been added to the cart.\n\n" +
        "Product: " + name + "\n" +
        "Price: Rs. " + price.toLocaleString() + "\n\n" +
        "We are preparing your checkout page."
    );
}
async function loadCMSProducts() {
  const container = document.getElementById("cms-products");
  if (!container) return;

  try {
    const response = await fetch("/products.json");

    if (!response.ok) {
      throw new Error("Products file could not be loaded");
    }

    const data = await response.json();
    const products = data.products || [];

    container.innerHTML = "";

    const availableProducts = products.filter(
      product => product.available !== false
    );

    if (availableProducts.length === 0) {
      container.innerHTML = "<p>Products coming soon.</p>";
      return;
    }

    availableProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      image.loading = "lazy";

      const title = document.createElement("h3");
      title.textContent = product.name;

      const price = document.createElement("p");
      price.textContent = "Rs. " + Number(product.price).toLocaleString("en-PK");

      const description = document.createElement("p");
      description.textContent = product.description || "";

      const addButton = document.createElement("button");
      addButton.textContent = "Add to Cart";
      addButton.addEventListener("click", () => {
        addToCart(product.name, Number(product.price));
      });

      const buyButton = document.createElement("button");
      buyButton.textContent = "Buy Now";
      buyButton.addEventListener("click", () => {
        buyNow(product.name, Number(product.price));
      });

      card.append(image, title, price, description, addButton, buyButton);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("CMS products error:", error);
    container.innerHTML = "<p>Products load nahi ho sake. Please try again.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadCMSProducts);
