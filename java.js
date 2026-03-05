const convertButton = document.querySelector(".button")
const selectFrom = document.querySelector(".select-from")
const selectTo = document.querySelector(".select")
const inputCurrency = document.querySelector(".input-currency")

const currencyValueFrom = document.querySelector(".currencyvalue")
const currencyValueTo = document.querySelector(".currencyvalue2")

const loading = document.getElementById("loading")
const historyList = document.getElementById("history-list")

convertButton.disabled = true


// NOMES DAS MOEDAS

const currencyNames = {

    "BRL": "Real Brasileiro",
    "USD": "Dólar Americano",
    "EUR": "Euro",
    "GBP": "Libra Esterlina",
    "JPY": "Iene Japonês",
    "AUD": "Dólar Australiano",
    "CAD": "Dólar Canadense",
    "CHF": "Franco Suíço",
    "CNY": "Yuan Chinês",
    "ARS": "Peso Argentino",
    "BTC": "Bitcoin",
    "ETH": "Ethereum",
    "DOGE": "Dogecoin"

}


// CURIOSIDADES

const currencyFacts = {

BRL: [
"O Brasil abriga cerca de 60% da Floresta Amazônica, a maior floresta tropical do mundo. Fonte: WWF.",
"O Pantanal é a maior área úmida tropical do planeta e um dos ecossistemas mais ricos em biodiversidade. Fonte: WWF.",
"O Brasil possui uma das maiores reservas de água doce do planeta. Fonte: FAO."
],

USD: [
"Os Estados Unidos possuem o Parque Nacional de Yellowstone, o primeiro parque nacional do mundo criado em 1872. Fonte: UNEP.",
"A NASA monitora mudanças climáticas globais usando satélites que observam florestas, oceanos e gelo polar.",
"Os EUA possuem mais de 400 parques nacionais protegendo biodiversidade e paisagens naturais."
],

EUR: [
"A União Europeia possui políticas ambientais rigorosas para redução de emissão de carbono. Fonte: UNEP.",
"A Europa tem metas para se tornar neutra em carbono até 2050.",
"Muitos países europeus investem fortemente em energia renovável como vento e solar."
],

GBP: [
"O Reino Unido foi um dos primeiros países a aprovar leis modernas de proteção ambiental.",
"Londres criou zonas de baixa emissão para reduzir poluição do ar.",
"O Reino Unido investe fortemente em energia eólica offshore."
],

JPY: [
"O Japão possui uma das maiores taxas de reciclagem do mundo.",
"O país investe muito em tecnologias para economia de energia.",
"Mais de 60% do território japonês é coberto por florestas."
],

AUD: [
"A Austrália abriga a Grande Barreira de Corais, o maior sistema de recifes do planeta.",
"Esse recife é visível até do espaço. Fonte: NASA.",
"A preservação dos recifes é essencial para milhões de espécies marinhas."
],

CAD: [
"O Canadá possui cerca de 10% das florestas do planeta.",
"Grande parte da energia do país vem de hidrelétricas.",
"O país tem milhares de lagos e grandes reservas de água doce."
],

CHF: [
"A Suíça é referência mundial em reciclagem.",
"O país protege grande parte dos Alpes e da biodiversidade local.",
"Suíços possuem uma das menores pegadas de carbono da Europa."
],

CNY: [
"A China lidera investimentos globais em energia solar.",
"O país possui grandes programas de reflorestamento.",
"A China criou enormes fazendas solares no deserto para energia limpa."
],

ARS: [
"A Argentina abriga parte da Patagônia, região com biodiversidade única.",
"O país possui grandes reservas naturais protegidas.",
"A região patagônica é importante para conservação de espécies marinhas."
],

BTC: [
"O Bitcoin consome muita energia para mineração, o que levanta debates ambientais.",
"Algumas empresas estão usando energia renovável para mineração de criptomoedas.",
"Hoje existem projetos de criptomoedas focados em menor impacto ambiental."
],

ETH: [
"O Ethereum reduziu drasticamente o consumo de energia após atualização para Proof of Stake.",
"A mudança reduziu mais de 99% do gasto energético da rede.",
"Criptomoedas mais modernas buscam ser ambientalmente sustentáveis."
],

DOGE: [
"A Dogecoin é uma criptomoeda inspirada em um meme da internet.",
"Criptomoedas estão discutindo formas de reduzir impacto ambiental.",
"Projetos de blockchain estão estudando formas de usar energia renovável."
]

}


// POPULAR SELECTS

function populateSelects(){

    selectFrom.innerHTML = ""
    selectTo.innerHTML = ""

    const options = []

    for(let code in currencyNames){

        const option = document.createElement("option")

        option.value = code
        option.textContent = `${currencyNames[code]} (${code})`

        options.push(option)

    }

    options.sort((a,b)=>a.textContent.localeCompare(b.textContent))

    options.forEach(option=>{

        selectFrom.appendChild(option.cloneNode(true))
        selectTo.appendChild(option.cloneNode(true))

    })

    convertButton.disabled = false

}


// ATUALIZA IMAGENS E NOMES

function updateCurrencyInfo(fromCurrency,toCurrency){

    const fromName = document.getElementById("currency-from-name")
    const fromImg = document.getElementById("currency-from-img")

    const toName = document.getElementById("currency-name")
    const toImg = document.getElementById("currency-img")

    const fromOption = selectFrom.querySelector(`option[value="${fromCurrency}"]`)
    const toOption = selectTo.querySelector(`option[value="${toCurrency}"]`)

    fromName.innerHTML = fromOption ? fromOption.textContent : fromCurrency
    toName.innerHTML = toOption ? toOption.textContent : toCurrency


    function getImg(code){

        if(code==="BTC") return "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
        if(code==="ETH") return "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        if(code==="DOGE") return "https://cryptologos.cc/logos/dogecoin-doge-logo.png"
        if(code==="EUR") return "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"

        return `https://flagsapi.com/${code.slice(0,2)}/flat/64.png`
    }

    fromImg.src = getImg(fromCurrency)
    toImg.src = getImg(toCurrency)

}


// FUNÇÃO CURIOSIDADE

function showRandomFact(currency){

    const factElement = document.getElementById("currency-fact")

    const facts = currencyFacts[currency]

    if(!facts){

        factElement.innerText = "Curiosidade não disponível para esta moeda."
        return

    }

    const randomIndex = Math.floor(Math.random() * facts.length)

    factElement.innerText = facts[randomIndex]

}


// CONVERSÃO

async function convertValues(){

loading.style.display = "block"

const from = selectFrom.value
const to = selectTo.value
const inputValue = Number(inputCurrency.value)

if(!inputValue){

    alert("Digite um valor válido")
    loading.style.display = "none"
    return

}

let brlValue = inputValue


// CONVERTER PARA BRL

if(from !== "BRL"){

    try{

        const responseFrom = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-BRL`)
        const dataFrom = await responseFrom.json()

        const rateFrom = Number(dataFrom[`${from}BRL`]?.bid)

        if(!rateFrom){

            alert(`Cotação de ${from} não disponível`)
            loading.style.display = "none"
            return

        }

        brlValue = inputValue * rateFrom

    }

    catch(err){

        alert("Erro ao buscar cotação")
        console.log(err)

        loading.style.display = "none"
        return

    }

}


// MOSTRAR VALOR DE ORIGEM

currencyValueFrom.innerHTML =

new Intl.NumberFormat("pt-BR",{

style:"currency",
currency:from

}).format(inputValue)


// CONVERTER DESTINO

try{

let convertedValue

if(to === "BRL"){

convertedValue = new Intl.NumberFormat("pt-BR",{

style:"currency",
currency:"BRL"

}).format(brlValue)

}

else{

const responseTo = await fetch(`https://economia.awesomeapi.com.br/json/last/${to}-BRL`)
const dataTo = await responseTo.json()

const rateTo = Number(dataTo[`${to}BRL`]?.bid)

if(!rateTo){

alert(`Cotação de ${to} não disponível`)
loading.style.display = "none"
return

}

if(["BTC","ETH","DOGE"].includes(to)){

convertedValue = (brlValue / rateTo).toFixed(6) + " " + to

}

else{

convertedValue = new Intl.NumberFormat("en-US",{

style:"currency",
currency:to

}).format(brlValue / rateTo)

}

}

currencyValueTo.innerHTML = convertedValue


// HISTÓRICO

const li = document.createElement("li")

li.textContent = `${inputValue} ${from} → ${convertedValue}`

historyList.prepend(li)

if(historyList.children.length > 5){

historyList.removeChild(historyList.lastChild)

}

}

catch(err){

alert("Erro ao buscar cotação. Tente novamente.")
console.log(err)

}

updateCurrencyInfo(from,to)

showRandomFact(to)

loading.style.display = "none"

}


populateSelects()

convertButton.addEventListener("click",convertValues)