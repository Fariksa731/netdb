const API = "/.netlify/functions/products";

// لعرض المنتجات
async function fetchProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("product-list");
  const table = document.getElementById("product-table")?.querySelector("tbody");

  data.forEach(prod => {
    if (list) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${prod.image}"><h3>${prod.name}</h3><p>${prod.price} ريال</p>`;
      list.appendChild(card);
    }
    if (table) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${prod.name}</td>
        <td>${prod.price}</td>
        <td><img src="${prod.image}" width="50"></td>
        <td><button onclick="editProduct('${prod._id}')">✏️</button></td>
        <td><button onclick="deleteProduct('${prod._id}')">🗑️</button></td>
      `;
      table.appendChild(row);
    }
  });
}

// إرسال منتج جديد
const form = document.getElementById("product-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const image = form.image.value;
    const price = form.price.value;
    await fetch(API, {
      method: "POST",
      body: JSON.stringify({ name, image, price }),
    });
    location.reload();
  });
}

// حذف منتج
async function deleteProduct(id) {
  await fetch(`${API}?id=${id}`, { method: "DELETE" });
  location.reload();
}

// تحميل المنتجات
fetchProducts();
