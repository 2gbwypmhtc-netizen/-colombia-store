const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let cart=[{name:'Prada Figure Tee',price:350},{name:'Amiri Drip Tee',price:350}];

$('#menuBtn').onclick=()=>$('#sideMenu').classList.add('open');
$('#closeMenu').onclick=()=>$('#sideMenu').classList.remove('open');
$$('.side-menu a').forEach(a=>a.onclick=()=>$('#sideMenu').classList.remove('open'));
$('#searchBtn').onclick=()=>$('#searchModal').classList.add('show');
$('#cartBtn').onclick=()=>{renderCart();$('#cartModal').classList.add('show')};
$$('.close').forEach(b=>b.onclick=()=>b.closest('.modal').classList.remove('show'));

function addToCart(name,price){cart.push({name,price});$('#cartCount').textContent=cart.length;renderCart();$('#cartModal').classList.add('show')}
function renderCart(){const box=$('#cartItems');box.innerHTML=cart.map((x,i)=>`<div class="cart-item"><b>${x.name}</b><span style="float:left">${x.price} EGP</span></div>`).join('');$('#cartTotal').textContent=cart.reduce((a,x)=>a+x.price,0)}
$$('.sizes button').forEach(b=>b.onclick=()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});
$$('.heart').forEach(b=>b.onclick=()=>b.textContent=b.textContent==='♡'?'♥':'♡');
$$('.collection-card').forEach(b=>b.onclick=()=>{document.querySelector('#best').scrollIntoView({behavior:'smooth'})});
$('#searchInput').oninput=e=>{const q=e.target.value.toLowerCase();$('#searchResults').innerHTML=[...$$('.product')].filter(p=>p.dataset.name.toLowerCase().includes(q)).map(p=>`<div class="search-item">${p.dataset.name}<b style="float:left;color:#ffd400">${p.dataset.price} EGP</b></div>`).join('')};
