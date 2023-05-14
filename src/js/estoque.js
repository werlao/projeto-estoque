onload = function () {
    var item = JSON.parse(localStorage.getItem("item"))
    exibirItemNaTela(item)
  }
  
  function refreshWindow() {
  
    if (localStorage.length > 0) {
  
    } else {
      exibirItemNaTela(item)
    }
  }
    
  function updateProduto(produto, key) {
    var existing = JSON.parse(localStorage.getItem("item"));
    if (existing[produto]) {
      switch (key) {
        case "caixas":
          console.log(existing[produto].caixas)
          existing[produto].caixas++
          existing[produto].unidades += existing[produto].quantidadeporcaixa
          existing[produto].total += existing[produto].quantidadeporcaixa
          break;
        case "unidades":
          existing[produto].unidades++
          existing[produto].total++
          break;
  
        case "retiradas":
          if (!!existing[produto].unidades) {
            existing[produto].retiradas++
            existing[produto].total--
          }
          break;
  
        case "limpar":
          existing[produto].caixas = 0
          existing[produto].unidades = 0
          existing[produto].retiradas = 0
          existing[produto].total = 0
          break;
      }
      localStorage.setItem("item", JSON.stringify(existing));
      exibirItemNaTela(existing)
    }
  }
  
  function addProduto() {
    const nome = "item"
    var key = document.querySelector("#adicionar").value
    var quantidade = parseInt(document.querySelector("#quantidadePorCaixas").value)
    var existing = localStorage.getItem(nome);
    existing = existing ? JSON.parse(existing) : {};
    if (!key.trim() || !!existing[key]) return
    existing[key] = new Produto(key, quantidade)
    localStorage.setItem(nome, JSON.stringify(existing));
    exibirItemNaTela(existing)
  };
  
  function exibirItemNaTela(item) {
    var html = ""
    for (key in item) {
      html += "<tr><td>" + key + "</td>"
      html += "<td>" + item[key].caixas + "</td>"
      html += "<td>" + item[key].unidades + "</td>"
      html += "<td>" + item[key].retiradas + "</td>"
      html += "<td>" + item[key].total + "</td>"
      html += `<td><button class="caixas" onClick='updateProduto("${key}", "caixas")'>Caixas</button>`
      html += `<button class="unidades" onClick='updateProduto("${key}", "unidades")'>Unidades</button>`
      html += `<button class="retiradas" onClick='updateProduto("${key}", "retiradas")'>Retiradas</button>`
      html += `<button class="limpar" onClick='updateProduto("${key}", "limpar")'>Limpar</button></td></tr>`
  
    }
    var tabelaItem = document.getElementById("tabelaItem")
    tabelaItem.innerHTML = html
  }
  
  function Produto(nome, qtd) {
    this.nome = nome;
    this.caixas = 0;
    this.unidades = 0;
    this.retiradas = 0;
    this.total = 0;
    this.quantidadeporcaixa = qtd ? qtd : 1;
  }