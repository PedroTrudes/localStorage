// pegando elementos do html e transformando em cosnt
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

//Meus ajustes para a 2btrust
const sTitulo = document.querySelector('#m-titulo');
const sDescritivo = document.querySelector('#m-descritivo');
const sDescricao = document.querySelector('#m-descricao');

// variaveis de itens e index do banco
let itens
let id

// abrindo modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    sTitulo.value = itens[index].titulo
    sDescritivo.value = itens[index].descritivo
    sDescricao.value = itens[index].descricao
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    sTitulo.value = ''
    sDescritivo.value = ''
    sDescricao.value = ''
  }
  
}

//editar item
function editItem(index) {

  openModal(true, index)
}

// deletando os itens
function deleteItem(index) {
  itens.splice(index, 1)//removendo com splice
  setItensBD()
  loadItens()
}

//monstando estrutura de onde vai mostrar os dados
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.titulo}</td>
    <td>${item.descritivo}</td>
    <td>${item.descricao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}




btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '' || sTitulo.value == '' || sDescritivo.value == '' || sDescricao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    itens[id].titulo = sTitulo.value
    itens[id].descritivo = sDescritivo.value
    itens[id].descricao = sDescricao.value
} else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value, 'titulo': sTitulo.value, 'descritivo': sDescritivo.value, 'descricao': sDescricao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  
  id = undefined
}

// carregando os dados do banco na tela 
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}


//pegando dados do banco
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
//setando itens para dentro do banco
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
