const cards = document.querySelector('#container--card')

let itens
let id




function viewItem(item , index) {
    let div = document.createElement('div')

    div.innerHTML = `
        <div class="card-post">
            <p>${item.nome}</p>
            <p>${item.funcao}</p>
            <p>RS: ${item.salario}</p>
            

        </div>

    `
    cards.appendChild(div)
}


function loadView() {
    itens = getItensBD()
    cards.innerHTML = ''
    itens.forEach((item, index) =>{
        viewItem(item, index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


loadView()