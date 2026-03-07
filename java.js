const convertButton = document.querySelector(".button")
const swapButton = document.querySelector(".swap")

const selectFrom = document.querySelector(".select-from")
const selectTo = document.querySelector(".select")

const inputCurrency = document.querySelector(".input-currency")

const currencyValueFrom = document.querySelector(".currencyvalue")
const currencyValueTo = document.querySelector(".currencyvalue2")

const loading = document.getElementById("loading")
const historyList = document.getElementById("history-list")

const exchangeRate = document.getElementById("exchange-rate")

const currencyFact = document.getElementById("currency-fact")

const currencyImg = document.getElementById("currency-img")
const currencyName = document.getElementById("currency-name")

const currencyFromImg = document.getElementById("currency-from-img")
const currencyFromName = document.getElementById("currency-from-name")

let chart

convertButton.disabled = true



// NOMES DAS MOEDAS

const currencyNames = {

    BRL: "Real Brasileiro",
    USD: "Dólar Americano",
    EUR: "Euro",
    GBP: "Libra Esterlina",
    JPY: "Iene Japonês",
    AUD: "Dólar Australiano",
    CAD: "Dólar Canadense",
    CHF: "Franco Suíço",
    CNY: "Yuan Chinês",
    ARS: "Peso Argentino",
    BTC: "Bitcoin",
    ETH: "Ethereum",
    DOGE: "Dogecoin"

}



// CURIOSIDADES

const currencyFacts = {

    USD: [
        "O dólar é a moeda mais usada no mundo.",
        "A Reserva Federal controla o dólar.",
        "O símbolo $ surgiu no século XVIII.",
        "Grande parte das reservas globais são em dólar.",
        "O dólar domina o comércio internacional."
    ],

    EUR: [
        "O euro foi criado em 1999.",
        "Mais de 300 milhões usam euro.",
        "O Banco Central Europeu controla a moeda.",
        "É a segunda moeda mais negociada.",
        "É usada em vários países da Europa."
    ],

    GBP: [
        "A libra esterlina é uma das moedas mais antigas ainda em uso.",
        "O Banco da Inglaterra controla a libra.",
        "O Reino Unido manteve a libra mesmo após a criação do euro."
    ],

    JPY: [
        "O iene japonês é uma das moedas mais negociadas do mundo.",
        "O Japão possui uma das maiores economias globais.",
        "O Banco do Japão controla a moeda."
    ],

    AUD: [
        "O dólar australiano é muito usado no mercado de commodities.",
        "A Austrália foi um dos primeiros países a usar notas de plástico."
    ],

    CAD: [
        "O dólar canadense é chamado de 'loonie'.",
        "O Canadá usa notas feitas de polímero."
    ],

    CHF: [
        "O franco suíço é considerado uma moeda muito estável.",
        "A Suíça tem um dos sistemas bancários mais fortes do mundo."
    ],

    CNY: [
        "O yuan é controlado pelo Banco Popular da China.",
        "A China possui uma das maiores economias do planeta."
    ],

    ARS: [
        "O peso argentino passou por várias mudanças monetárias.",
        "A Argentina já enfrentou períodos de alta inflação."
    ],

    BRL: [
        "O real foi criado em 1994 durante o Plano Real.",
        "O Banco Central do Brasil controla a moeda."
    ],

    BTC: [
        "Bitcoin foi criado em 2009.",
        "O criador usa o nome Satoshi Nakamoto.",
        "Existe limite de bitcoins.",
        "Usa tecnologia blockchain."
    ],

    ETH: [
        "Ethereum foi criado em 2015.",
        "Permite contratos inteligentes.",
        "Vitalik Buterin criou Ethereum."
    ],

    DOGE: [
        "Dogecoin começou como uma piada na internet.",
        "Usa o meme do cachorro Shiba Inu.",
        "Hoje é uma criptomoeda popular."
    ]

}



// FUNÇÃO BANDEIRAS E CRIPTO

function getCurrencyImage(code) {

    const flags = {

        BRL: "br",
        USD: "us",
        EUR: "de",
        GBP: "gb",
        JPY: "jp",
        AUD: "au",
        CAD: "ca",
        CHF: "ch",
        CNY: "cn",
        ARS: "ar"

    }

    const crypto = {

        BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png"

    }

    if (flags[code]) return `https://flagcdn.com/48x36/${flags[code]}.png`

    if (crypto[code]) return crypto[code]

    return "https://flagcdn.com/48x36/un.png"

}



// POPULAR SELECT

function populateSelects() {

    selectFrom.innerHTML = ""
    selectTo.innerHTML = ""

    for (let code in currencyNames) {

        const option1 = document.createElement("option")

        option1.value = code
        option1.textContent = `${currencyNames[code]} (${code})`

        const option2 = option1.cloneNode(true)

        selectFrom.appendChild(option1)
        selectTo.appendChild(option2)

    }

    convertButton.disabled = false

}

populateSelects()



// INVERTER MOEDAS

swapButton.addEventListener("click", () => {

    const temp = selectFrom.value
    selectFrom.value = selectTo.value
    selectTo.value = temp

})



// CONVERSÃO

async function convertValues() {

    loading.style.display = "block"

    const from = selectFrom.value
    const to = selectTo.value

    currencyFromImg.src = getCurrencyImage(from)
    currencyImg.src = getCurrencyImage(to)

    currencyFromName.innerText = currencyNames[from]
    currencyName.innerText = currencyNames[to]

    const inputValue = Number(inputCurrency.value)

    if (!inputValue) {

        alert("Digite um valor válido")
        loading.style.display = "none"
        return

    }

    try {

        const response = await fetch("https://economia.awesomeapi.com.br/json/all")

        const data = await response.json()

        let rateFrom = 1
        let rateTo = 1

        if (from !== "BRL") rateFrom = data[from].bid
        if (to !== "BRL") rateTo = data[to].bid

        const brlValue = inputValue * rateFrom
        const result = brlValue / rateTo

        currencyValueFrom.innerText = inputValue + " " + from
        currencyValueTo.innerText = result.toFixed(2) + " " + to

        exchangeRate.innerText = `1 ${from} = ${(rateFrom / rateTo).toFixed(4)} ${to}`



        // HISTÓRICO

        const li = document.createElement("li")

        li.textContent = `${inputValue} ${from} → ${result.toFixed(2)} ${to}`

        historyList.prepend(li)

        if (historyList.children.length > 5) {

            historyList.removeChild(historyList.lastChild)

        }



        // CURIOSIDADE

        if (currencyFacts[to]) {

            const random = Math.floor(Math.random() * currencyFacts[to].length)
            currencyFact.innerText = currencyFacts[to][random]

        } else {

            currencyFact.innerText = "Nenhuma curiosidade disponível para esta moeda."

        }



        // GRÁFICO

        loadChart(to)

    }

    catch (error) {

        console.log(error)
        alert("Erro ao buscar cotação")

    }

    loading.style.display = "none"

}

convertButton.addEventListener("click", convertValues)



// BUSCAR DADOS GRÁFICO

async function loadChart(currency) {

    if (currency === "BRL") return

    try {

        const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${currency}-BRL/14`)

        const data = await response.json()

        if (!Array.isArray(data)) return

        const prices = []
        const labels = []

        data.reverse().forEach(day => {

            prices.push(Number(day.bid))

            const date = new Date(day.timestamp * 1000)

            labels.push(date.toLocaleDateString())

        })

        const rci = calculateRCI(prices, 9)

        createChart(labels, prices, rci)

    }

    catch (err) {

        console.log("Erro gráfico", err)

    }

}



// RCI

function calculateRCI(prices, period) {

    const rci = []

    for (let i = 0; i < prices.length; i++) {

        if (i < period) { rci.push(null); continue }

        let window = prices.slice(i - period, i)

        let rank = [...window].sort((a, b) => b - a)

        let sum = 0

        for (let j = 0; j < period; j++) {

            let priceRank = rank.indexOf(window[j]) + 1
            let timeRank = j + 1

            sum += Math.pow(priceRank - timeRank, 2)

        }

        let value = (1 - (6 * sum) / (period * (period * period - 1))) * 100

        rci.push(value)

    }

    return rci

}



// MÉDIA MÓVEL

function calculateMA(prices, period) {

    const ma = []

    for (let i = 0; i < prices.length; i++) {

        if (i < period) { ma.push(null); continue }

        let sum = 0

        for (let j = 0; j < period; j++) {

            sum += prices[i - j]

        }

        ma.push(sum / period)

    }

    return ma

}



// SUPORTE E RESISTÊNCIA

function calculateSupportResistance(prices) {

    return {

        support: Math.min(...prices),
        resistance: Math.max(...prices)

    }

}



// CRIAR GRÁFICO

function createChart(labels, prices, rci) {

    const ctx = document.getElementById("currencyChart")

    if (chart) chart.destroy()

    const ma = calculateMA(prices, 5)
    const sr = calculateSupportResistance(prices)

    chart = new Chart(ctx, {

        type: "line",

        data: {
            labels: labels,
            datasets: [

                {
                    label: "Preço",
                    data: prices,
                    yAxisID: "y",
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.1)"
                },

                {
                    label: "Média móvel",
                    data: ma,
                    yAxisID: "y",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    borderColor: "#ffd166"
                },

                {
                    label: "Suporte",
                    data: Array(prices.length).fill(sr.support),
                    yAxisID: "y",
                    borderWidth: 2,
                    borderColor: "#ff6b6b"
                },

                {
                    label: "Resistência",
                    data: Array(prices.length).fill(sr.resistance),
                    yAxisID: "y",
                    borderWidth: 2,
                    borderColor: "#4ecdc4"
                },

                {
                    label: "RCI",
                    data: rci,
                    yAxisID: "rci",
                    borderWidth: 2,
                    borderColor: "#4dabf7"
                }

            ]
        },

        options:{

responsive:true,
interaction:{
    mode:"index",
    intersect:false
},
hover:{
    mode:"index",
    intersect:false
},
maintainAspectRatio:false,
plugins:{
legend:{
position:"bottom",
labels:{
color:"#ffffff"
}
}
},

scales:{

y:{
position:"left",
ticks:{
color:"#ffffff"
},
grid:{
color:"rgba(255,255,255,0.2)"
}
},

rci:{
position:"right",
min:-100,
max:100,
ticks:{
color:"#ffffff"
},
grid:{
drawOnChartArea:false
}

},

x:{
ticks:{
color:"#ffffff"
},
grid:{
color:"rgba(255,255,255,0.1)"
}
}

}

}

    })

}