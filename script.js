const STORAGE_KEY = "inventory-management-products-v1";
let products = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const form = document.getElementById("productForm");
const body = document.getElementById("inventoryBody");
const searchInput = document.getElementById("searchInput");

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function stockStatus(quantity) {
  if (quantity === 0) return ["Out of stock", "out-stock"];
  if (quantity <= 5) return ["Low stock", "low-stock"];
  return ["In stock", "in-stock"];
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p =>
    p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
  );

  body.innerHTML = visible.map(p => {
    const [status, className] = stockStatus(p.quantity);
    return `<tr>
      <td>${escapeHtml(p.id)}</td>
      <td>${escapeHtml(p.name)}</td>
      <td>₹${p.price.toFixed(2)}</td>
      <td>${p.quantity}</td>
      <td><span class="status ${className}">${status}</span></td>
      <td><button class="delete" data-delete="${escapeHtml(p.id)}" type="button">Delete</button></td>
    </tr>`;
  }).join("");

  document.getElementById("totalProducts").textContent = products.length;
  document.getElementById("totalUnits").textContent = products.reduce((sum, p) => sum + p.quantity, 0);
  document.getElementById("lowStock").textContent = products.filter(p => p.quantity <= 5).length;
  document.getElementById("emptyMessage").hidden = visible.length > 0;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const id = document.getElementById("productId").value.trim();
  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const quantity = Number(document.getElementById("productQuantity").value);
  const message = document.getElementById("formMessage");

  if (products.some(p => p.id.toLowerCase() === id.toLowerCase())) {
    message.textContent = "This Product ID already exists. Please use a different ID.";
    message.style.color = "#b93838";
    return;
  }

  products.push({ id, name, price, quantity });
  saveProducts();
  form.reset();
  message.textContent = "Product added successfully.";
  message.style.color = "#176b4a";
  render();
});

body.addEventListener("click", event => {
  const id = event.target.dataset.delete;
  if (!id) return;
  products = products.filter(p => p.id !== id);
  saveProducts();
  render();
});

searchInput.addEventListener("input", render);
render();
