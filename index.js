const imagensHero = [
    "./src/img/vulcao.png",
    "https://receitatodahora.com.br/wp-content/uploads/2023/02/bolo-no-pote-11-02.jpg.webp",
    "./src/img/tortaSalg.png"
  ];

  let indexImg = 0;
  const hero = document.getElementById("hero");

  function mudarImagemHero() {
    hero.style.backgroundImage = `url('${imagensHero[indexImg]}')`;
    indexImg = (indexImg + 1) % imagensHero.length;
  }

  setInterval(mudarImagemHero, 4000);
  mudarImagemHero();

  const produtos = [
    { id: 1, nome: "Bolo de kit kat", preco: 14, imagem: "/src/img/bolo1.png" },
    { id: 2, nome: "Bolo Banoffe", preco: 14, imagem: "/src/img/bolo2.png" },
    { id: 3, nome: "Bolo de Oreo", preco: 14, imagem: "/src/img/bolo3.png" },
    { id: 4, nome: "Bolo de Ninho com morango", preco: 14, imagem: "/src/img/bolo4.png" },
    { id: 5, nome: "Bolo de ninho com Nutella", preco: 14, imagem: "/src/img/bolo5.png" },
    { id: 6, nome: "Bolo de Chocolate", preco: 12, imagem: "/src/img/bolo6.png" },
    { id: 7, nome: "Bolo de Paçoca", preco: 12, imagem: "/src/img/bolo7.png" },
    { id: 8, nome: "Bolo de Maracujá", preco: 12, imagem: "/src/img/bolo8.png" },
    { id: 9, nome: "Bolo de torta de limão", preco: 12, imagem: "/src/img/bolo9.png" }
  ];

  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = {};

  function renderProdutos() {
    produtos.forEach(prod => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <h3>${prod.nome}</h3>
        <p>R$ ${prod.preco.toFixed(2)}</p>
        <button onclick="adicionarCarrinho(${prod.id})">Adicionar ao Carrinho</button>
      `;
      productList.appendChild(div);
    });
  }

  function adicionarCarrinho(id) {
    if (!cart[id]) {
      cart[id] = { ...produtos.find(p => p.id === id), quantidade: 1 };
    } else {
      cart[id].quantidade++;
    }
    atualizarCarrinho();
  }

  function removerCarrinho(id) {
    if (cart[id]) {
      cart[id].quantidade--;
      if (cart[id].quantidade <= 0) delete cart[id];
    }
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    cartItems.innerHTML = '';
    let total = 0;
    Object.values(cart).forEach(item => {
      total += item.preco * item.quantidade;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        <div>
          <button onclick="adicionarCarrinho(${item.id})">+</button>
          <button onclick="removerCarrinho(${item.id})">-</button>
        </div>
      `;
      cartItems.appendChild(div);
    });
    cartTotal.textContent = total.toFixed(2);
  }

  function gerarImagemPedido() {
    const lista = document.getElementById('pedido-itens');
    const totalSpan = document.getElementById('pedido-total');
    lista.innerHTML = '';
    let total = 0;

    Object.values(cart).forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
      lista.appendChild(li);
      total += item.preco * item.quantidade;
    });

    totalSpan.textContent = total.toFixed(2);
    const pedidoVisual = document.getElementById('pedido-visual');
    pedidoVisual.style.display = 'block';

    html2canvas(pedidoVisual).then(canvas => {
      pedidoVisual.style.display = 'none';
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement('a');
      link.download = 'pedido.jpg';
      link.href = imgData;
      link.click();

      const mensagem = encodeURIComponent("Olá! Segue meu pedido em anexo 😊");
      const numero = "5521976685573"; // Substitua aqui pelo seu número com DDD e DDI
      const waLink = `https://wa.me/${numero}?text=${mensagem}`;
      document.getElementById("linkWhatsapp").href = waLink;
      document.getElementById("linkWhatsapp").click();

      alert("Imagem do pedido gerada. Agora anexe no WhatsApp.");
    });
  }

  renderProdutos();