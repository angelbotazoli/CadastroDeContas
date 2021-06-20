var listaContas = []

function Conta() {
  this.dataVencimentoConta;
  this.nomeConta;
  this.valorConta;
}

function cadastrarConta() {
  validarCampoEmBranco()

  var dataVencimentoConta = document.getElementById("data-vencimento-conta").value
  var nomeConta = document.getElementById("nome-conta").value
  var valorConta = document.getElementById("valor-conta").value
  var contaPaga

  conta = new Conta()

  conta.dataVencimentoConta = dataVencimentoConta
  conta.nomeConta = nomeConta
  conta.valorConta = valorConta
  conta.contaPaga = false

  listaContas.push(conta)

  if (localStorage.getItem('items') === null) {
    localStorage.setItem('items', JSON.stringify([conta]));
  } else {
    localStorage.setItem(
      'items',
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('items')),
        conta
      ])
    );
  }
}

function getItems() {
  const items = JSON.parse(localStorage.getItem('items'));
  return items
}

function validarCampoEmBranco() {
  var data = document.getElementById("data-vencimento-conta").value
  var conta = document.getElementById("nome-conta").value
  var valor = document.getElementById("valor-conta").value

  if (data == "") {
    alert("Preencha o campo")
  } else if (conta == "") {
    alert("Preencha o campo")
  } else if (valor == "") {
    alert("Preencha o campo")
  }
}

function limparCampos() {
  var data = document.getElementById("data-vencimento-conta").value = ""
  var conta = document.getElementById("nome-conta").value = ""
  var valor = document.getElementById("valor-conta").value = ""
}

function listarContas() {
  document.getElementById("lista-contas").style.display = "block"

  var lista = []
  var tabela = document.getElementById("contas-cadastradas")
  var html = ""

  lista = getItems()

  for (var i = 0; i < lista.length; i++) {
    html += "<tr><td>" + lista[i].dataVencimentoConta + "</td>"
    html += "<td>" + lista[i].nomeConta + "</td>"
    html += "<td>" + lista[i].valorConta + "</td>"

    if (lista[i].contaPaga == true) {
      html += "<td><input id='marcado' type='checkbox' checked disabled></td>"
    } else {
      html += "<td><input id='marcado' type='checkbox'></td>"
    }

    html += "<td><input id='check-deletar-conta' type='checkbox'></td></tr>"
  }

  tabela.innerHTML = html
}

function pagarContas() {
  check = document.querySelectorAll("tbody tr td input")
  lista = getItems()

  for (var j = 0; j < lista.length; j++) {
    if (check[j].checked == true) {
      check[j].disabled = true
      lista[j].contaPaga = true
    }
  }

  localStorage.setItem('items', JSON.stringify(lista));
}

function deletarContas() {
  var deletarConta = document.querySelectorAll("tbody tr td input[id='check-deletar-conta']")

  for (var i = 0; i <= deletarConta.length; i++) {
    if (deletarConta[i].checked == true) {
      document.getElementById("tabela-contas").deleteRow(i + 1);
      // localStorage.removeItem("items");
    }
  }
}