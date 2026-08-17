const products=[
{id:1,name:"White Classic Polo",price:400,collection:"classic",color:"white",img:"https://images.unsplash.com/photo-1625910513413-5fc45e3a0d7b?auto=format&fit=crop&w=900&q=80",desc:"Clean, refined and easy to style."},
{id:2,name:"Oversized Summer Tee",price:350,collection:"summer",color:"white",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",desc:"Relaxed fit for everyday summer looks."},
{id:3,name:"Signature Black Tee",price:350,collection:"new",color:"black",img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",desc:"A modern signature piece."},
{id:4,name:"Limited Statement Tee",price:450,collection:"limited",color:"black",img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",desc:"Limited availability."}
];

let cart=JSON.parse(localStorage.getItem("cs_cart")||"[]");
let currentProduct=null;
const app=document.querySelector("#app");

function money(n){return "EGP "+n}
function title(c){return ({new:"New Collection",summer:"Summer Collection",classic:"Classic Collection",bestsellers:"Best Sellers",limited:"Limited Edition"})[c]||c}

function card(p){
 return `<article class="card" onclick="openProduct(${p.id})">
   <img src="${p.img}" alt="${p.name}">
   <div class="card-info"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div>
 </article>`
}

function home(){
 app.innerHTML=`
 <section class="hero" id="home">
   <div class="hero-media" aria-label="New Collection video placeholder"></div>
   <div class="hero-content">
     <p class="eyebrow">COLOMBIA STORE</p>
     <h1>NEW<br>COLLECTION</h1>
     <a class="primary" href="#collection/new">SHOP NOW</a>
   </div>
 </section>
 <section class="section">
   <div class="section-head"><div><p class="eyebrow">Explore</p><h2>Collections</h2></div></div>
   <div class="grid">${["new","summer","classic","bestsellers","limited"].map(c=>`
    <article class="card" onclick="location.hash='collection/${c}'">
      <img src="${products.find(p=>p.collection===c)?.img||products[0].img}" alt="${title(c)}">
      <div class="card-info"><h3>${emojiTitle(c)}</h3><span>Explore →</span></div>
    </article>`).join("")}</div>
 </section>
 <section class="section">
   <div class="section-head"><div><p class="eyebrow">Selected</p><h2>Best Sellers</h2></div><a href="#collection/bestsellers">View all →</a></div>
   <div class="grid">${products.slice(0,4).map(card).join("")}</div>
 </section>
 <section class="section"><div class="account-card"><p class="eyebrow">COLOMBIA STORE</p><h2>Shop your way.</h2><p class="helper">Create an account for saved orders and wishlist, or continue as a guest. You can always track an order with its order number.</p><a class="primary" href="#account">ACCOUNT</a></div></section>`;
}

function emojiTitle(c){
 return ({new:"✨🔥 New Collection",summer:"☀️🌴 Summer Collection",classic:"👕🖤 Classic Collection",bestsellers:"🔥⭐ Best Sellers",limited:"💎✨ Limited Edition"})[c]||title(c)
}

function collection(c){
 let ps=c==="bestsellers"?products:products.filter(p=>p.collection===c);
 app.innerHTML=`<section class="collection-hero"><p class="eyebrow">COLOMBIA STORE</p><h1>${emojiTitle(c)}</h1><p>Premium streetwear. Clean, confident style.</p></section>
 <section class="section"><div class="grid">${ps.length?ps.map(card).join(""):"<p>No products added yet.</p>"}</div></section>`;
}

function account(){
 app.innerHTML=`<section class="account-wrap"><div class="account-card">
 <p class="eyebrow">COLOMBIA STORE</p><h1>Account</h1>
 <p class="helper">Choose how you want to continue. Account creation is optional.</p>
 <div class="account-actions">
   <button class="primary" onclick="accountForm('login')">LOGIN</button>
   <button class="primary" onclick="accountForm('create')">CREATE ACCOUNT</button>
   <button class="guest" onclick="guestContinue()">CONTINUE AS GUEST</button>
 </div>
 </div></section>`;
}

function accountForm(mode){
 const create=mode==="create";
 app.innerHTML=`<section class="account-wrap"><div class="account-card">
 <p class="eyebrow">COLOMBIA STORE</p><h1>${create?"Create Account":"Login"}</h1>
 <label>Mobile / WhatsApp<input class="input" id="authPhone" placeholder="01xxxxxxxxx"></label>
 <label>${create?"Email":"Email or mobile"}<input class="input" id="authEmail" placeholder="${create?"name@example.com":"Enter your email or mobile"}"></label>
 <label>Password<input class="input" id="authPassword" type="password" placeholder="••••••••"></label>
 ${create?'<label>Confirm Password<input class="input" id="authConfirm" type="password" placeholder="••••••••"></label>':''}
 <button class="primary" onclick="savePrototypeAccount('${mode}')">${create?"CREATE ACCOUNT":"LOGIN"}</button>
 <p class="helper">Prototype mode: account data is stored locally on this device until a real database/authentication service is connected.</p>
 <button class="guest" onclick="location.hash='account'">Back</button>
 </div></section>`;
}

function savePrototypeAccount(mode){
 const phone=document.querySelector("#authPhone").value.trim();
 const email=document.querySelector("#authEmail").value.trim();
 const pass=document.querySelector("#authPassword").value;
 if(!phone||!email||!pass){alert("Please complete the required fields.");return}
 if(mode==="create"&&pass!==document.querySelector("#authConfirm").value){alert("Passwords do not match.");return}
 localStorage.setItem("cs_account",JSON.stringify({phone,email}));
 alert(mode==="create"?"Account created.":"Login saved for this prototype.");
 location.hash="account";
}

function guestContinue(){localStorage.setItem("cs_guest","1");alert("You can continue as a guest.");location.hash="home"}

function track(){
 app.innerHTML=`<section class="section track"><p class="eyebrow">COLOMBIA STORE</p><h1>Track Order</h1><p>Enter your order number to check the latest status. No account is required.</p><input class="input" id="orderNo" placeholder="Order number"><button class="primary" onclick="lookup()">TRACK ORDER</button><div class="status" id="status"></div></section>`;
}

function lookup(){
 const n=document.querySelector("#orderNo").value.trim();
 const box=document.querySelector("#status");
 box.style.display="block";
 box.innerHTML=n?`<strong>Order ${n}</strong><p>Order status: <b>Preparing</b></p><small>Live courier tracking will be connected when the courier integration is added.</small>`:"Please enter an order number.";
}

function route(){
 let h=location.hash.slice(1)||"home";
 if(h==="home")home();
 else if(h==="track")track();
 else if(h==="account")account();
 else if(h.startsWith("collection/"))collection(h.split("/")[1]);
 else home();
 window.scrollTo(0,0);
}

function openProduct(id){
 currentProduct=products.find(p=>p.id===id);
 document.querySelector("#modalImg").src=currentProduct.img;
 document.querySelector("#modalName").textContent=currentProduct.name;
 document.querySelector("#modalPrice").textContent=money(currentProduct.price);
 document.querySelector("#modalCollection").textContent=emojiTitle(currentProduct.collection);
 document.querySelector("#modalDesc").textContent=currentProduct.desc;
 document.querySelector("#productModal").classList.add("show");
}

function updateCart(){
 document.querySelector("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><img src="${x.img}" alt=""><div><b>${x.name}</b><div>Size: ${x.size}</div><div>${money(x.price)} × ${x.qty}</div></div></div>`).join(""):"<p>Your cart is empty.</p>";
 document.querySelector("#cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
 localStorage.setItem("cs_cart",JSON.stringify(cart));
}

function addCurrentToCart(){
 let s=document.querySelector("#modalSize").value;
 let x=cart.find(i=>i.id===currentProduct.id&&i.size===s);
 if(x)x.qty++;else cart.push({...currentProduct,size:s,qty:1});
 updateCart();
 document.querySelector("#productModal").classList.remove("show");
 document.querySelector("#cartPanel").classList.add("show");
}

function buyNow(){
 addCurrentToCart();
}

function search(){
 document.querySelector("#searchPanel").classList.add("show");
 document.querySelector("#searchInput").focus();
 renderSearch("");
}

function renderSearch(q){
 const term=q.trim().toLowerCase();
 const matches=products.filter(p=>`${p.name} ${p.color} ${p.collection} ${title(p.collection)}`.toLowerCase().includes(term));
 document.querySelector("#searchResults").innerHTML=matches.map(p=>`<a class="search-result" href="#collection/${p.collection}" onclick="closeSearch()"><span>${p.name}</span><b>${money(p.price)}</b></a>`).join("")||"<p class='helper'>No matching products yet.</p>";
}

function closeSearch(){document.querySelector("#searchPanel").classList.remove("show")}

document.querySelector("#menuBtn").onclick=()=>{document.querySelector("#drawer").classList.add("open");document.querySelector("#drawer").setAttribute("aria-hidden","false");document.querySelector("#shade").classList.add("open")};
document.querySelector("#closeDrawer").onclick=()=>{document.querySelector("#drawer").classList.remove("open");document.querySelector("#drawer").setAttribute("aria-hidden","true");document.querySelector("#shade").classList.remove("open")};
document.querySelector("#shade").onclick=document.querySelector("#closeDrawer").onclick;
document.querySelector("#searchBtn").onclick=search;
document.querySelector("#closeSearch").onclick=closeSearch;
document.querySelector("#searchInput").addEventListener("input",e=>renderSearch(e.target.value));
document.querySelector("#closeModal").onclick=()=>document.querySelector("#productModal").classList.remove("show");
document.querySelector("#cartBtn").onclick=()=>{updateCart();document.querySelector("#cartPanel").classList.add("show")};
document.querySelector("#closeCart").onclick=()=>document.querySelector("#cartPanel").classList.remove("show");
document.querySelector("#addBtn").onclick=addCurrentToCart;
document.querySelector("#buyBtn").onclick=buyNow;
document.querySelector("#checkoutBtn").onclick=()=>location.hash="account";
window.addEventListener("hashchange",route);
route();
updateCart();
