// Lista de productos
const productos = [
  { id: 1, nombre: "Smoothie Verde",desc:"Refrescante mezcla de espinaca, piña y manzana verde", precio: 65,img : "img.jpeg"},
  { id: 2, nombre: "Bowl Frutal",desc:"Bowl con frutas tropicales, granola artesanal y miel natural.", precio: 80, img: "img1.jpeg" },
  { id: 3, nombre: "Barra Energética",desc:"Barra echa de granola artesanal con un toque de miel y pasas  ", precio: 45, img: "img2.jpeg" },
  { id: 4, nombre: "Ensalada Detox",desc:"Nuestra Ensalada Detox combina ingredientes 100% naturales como espinaca, pepino, aguacate, manzana verde y semillas de chía.", precio: 90, img: "img3.jpeg" },
  { id: 5, nombre: "Agua Detox", desc:"Elige bienestar con nuestra Agua Detox, una bebida natural infusionada con pepino, limón y menta fresca",precio: 40, img: "img4.jpg"},
   { id: 6, nombre: "Bowl Tropical de Yogur y Mango", desc:"yogur natural bajo en grasa con mango fresco, avena y semillas de chía. Alto en fibra y probióticos.",precio: 45, img: "img5.jpg"},
      { id: 7, nombre: "Brownie Fit de Cacao y Avena", desc:"Brownie suave sin harina refinada, endulzado con miel y cacao puro. Fuente de energía y antioxidantes..",precio: 30, img: "img6.jpeg"}
     , { id: 8, nombre: "Gelatina Natural de fresa con stevia", desc:"Gelatina casera hecha con fruta real y sin azúcar añadida. Baja en calorías y refrescante.",precio: 25, img: "img7.jpeg"}
     , { id: 9, nombre: "Bowl Power de Quinoa y Aguacate", desc:"Quinoa, garbanzo, espinaca, aguacate y semillas. Alto en proteína vegetal.",precio: 90, img: "img8.jpg"}

];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("carrito-btn");
const cartModal = document.getElementById("carrito-modal");
const closeModal = document.getElementById("cerrar-carrito");
const cartItems = document.getElementById("carrito-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
let carrito = [];

// Mostrar productos
productos.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nombre}">
    <h1>${prod.nombre}</h3>
    <h3>${prod.desc}</h3>
    <p>$${prod.precio} MXN</p>
    <button class="btn" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
  `;
  productList.appendChild(card);
});

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  cartItems.innerHTML = "";
  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.nombre} - $${item.precio} 
      <button onclick="eliminarDelCarrito(${index})">❌</button></p>`;
    cartItems.appendChild(div);
  });
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalEl.textContent = total;
  cartCount.textContent = carrito.length;
}

// Eliminar producto
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Mostrar y cerrar modal
cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeModal.addEventListener("click", () => cartModal.classList.add("hidden"));

// Simular compra
document.getElementById("comprar-btn").addEventListener("click", () => {
  alert("✅ ¡Gracias por tu compra en GreenBite!Te mandaremos tu comprobante para realizar tu pago");
  carrito = [];
  actualizarCarrito();
  cartModal.classList.add("hidden");
});

// Formulario de contacto
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".thanks").hidden = false;
  e.target.reset();
});

// CHAT INTELIGENTE SIMPLE
const chatBubble = document.getElementById("chat-bubble");
const chatBox = document.getElementById("chat-box");
const chatSend = document.getElementById("chat-send");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatBubble.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  addMessage("Tú", msg, "user-msg");
  chatInput.value = "";

  setTimeout(() => {
    const respuesta = getBotResponse(msg);
    addMessage("GreenBiteBot", respuesta, "bot-msg");
  }, 700);
}

function addMessage(sender, text, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.textContent = `${sender}: ${text}`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Respuestas simples
function getBotResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hola")) return "¡Hola! 🌿 ¿Cómo puedo ayudarte hoy?";
  if (msg.includes("producto") || msg.includes("productos")) return "Tenemos ensaladas, aguas detox y granola natural. ¿Quieres ver precios?";
  if (msg.includes("precio")) return "💚 Ensalada Detox $85 | Agua Detox $45 | Granola $70.";
  if (msg.includes("envío")) return "Hacemos envíos a todo México 🇲🇽 por solo $50.";
  if (msg.includes("gracias")) return "¡Con gusto! 💚";
  return "Perdón, aún estoy aprendiendo 🤖 ¿Podrías repetirlo de otra forma?";
}
// BOTONES RÁPIDOS
const quickButtons = document.querySelectorAll(".quick-btn");

quickButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.textContent;
    addMessage("Tú", question, "user-msg");
    setTimeout(() => {
      const respuesta = getBotResponse(question.toLowerCase());
      addMessage("GreenBiteBot", respuesta, "bot-msg");
    }, 600);
  });
});
// Cerrar chat
const chatClose = document.getElementById("chat-close");

chatClose.addEventListener("click", () => {
  chatBox.classList.add("hidden");
});
