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

const chartMessage = document.getElementById("chart-message")
const clearHistoryButton = document.getElementById("clear-history")
const clearChartButton = document.getElementById("clear-chart")
const copyResultButton = document.getElementById("copy-result")
const themeButton = document.getElementById("theme-toggle")

if(themeButton){
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
    })
}
let chart

convertButton.disabled = true


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


const currencyFacts = {

    BRL: [
        "🇧🇷 O Brasil possui cerca de 20% da biodiversidade do planeta e a Amazônia é uma das maiores reservas naturais do mundo.",
        "🇧🇷 Durante enchentes em Minas Gerais, empresas brasileiras já ajudaram farmácias locais repondo produtos.",
        "🇧🇷 O Brasil tem uma das maiores reservas de água doce do planeta.",
        "🇧🇷 Curitiba é referência mundial em transporte público sustentável.",
        "🇧🇷 Povos indígenas preservam técnicas agrícolas ancestrais."
    ],

    USD: [
        "🇺🇸 O dólar é a moeda mais usada no mundo.",
        "🇺🇸 Universidades americanas lideram pesquisas em energias renováveis.",
        "🇺🇸 Parques nacionais protegem ecossistemas importantes.",
        "🇺🇸 A Califórnia possui grandes projetos ambientais.",
        "🇺🇸 Cidades investem em agricultura urbana."
    ],

    EUR: [
        "🇪🇺 O euro foi criado em 1999.",
        "🇪🇺 A União Europeia investe fortemente em energia limpa.",
        "🇪🇺 Alemanha é referência em eficiência energética.",
        "🇪🇺 Agricultura orgânica é incentivada.",
        "🇪🇺 Transporte sustentável é prioridade."
    ],

    GBP: [
        "🇬🇧 O Reino Unido possui grandes projetos de energia eólica.",
        "🇬🇧 Londres possui políticas para reduzir poluição.",
        "🇬🇧 Escócia preserva grandes áreas naturais.",
        "🇬🇧 Universidades pesquisam conservação marinha.",
        "🇬🇧 Há grande investimento ambiental."
    ],

    JPY: [
        "🇯🇵 Japão é líder em tecnologia sustentável.",
        "🇯🇵 Cidades possuem reciclagem avançada.",
        "🇯🇵 Kyoto preserva jardins históricos.",
        "🇯🇵 Pesquisas reduzem impacto ambiental.",
        "🇯🇵 Robôs ajudam a limpar oceanos."
    ],

    AUD: [
        "🇦🇺 A Austrália possui a Grande Barreira de Corais.",
        "🇦🇺 Programas protegem coalas.",
        "🇦🇺 Grandes projetos solares existem no interior.",
        "🇦🇺 Cidades possuem reciclagem avançada.",
        "🇦🇺 Reservas naturais preservam biodiversidade."
    ],

    CAD: [
        "🇨🇦 Canadá possui enormes florestas.",
        "🇨🇦 Parques nacionais protegem a natureza.",
        "🇨🇦 Transporte sustentável é incentivado.",
        "🇨🇦 Projetos protegem ursos polares.",
        "🇨🇦 Cidades têm iniciativas verdes."
    ],

    CHF: [
        "🇨🇭 Suíça é referência em reciclagem.",
        "🇨🇭 Alpes são protegidos por políticas ambientais.",
        "🇨🇭 Transporte ferroviário reduz carbono.",
        "🇨🇭 Cidades incentivam transporte público.",
        "🇨🇭 Energia hidrelétrica é forte."
    ],

    CNY: [
        "🇨🇳 China lidera energia solar global.",
        "🇨🇳 Grandes projetos de reflorestamento.",
        "🇨🇳 Transporte elétrico nas cidades.",
        "🇨🇳 Cidades inteligentes monitoram poluição.",
        "🇨🇳 Conservação de pandas."
    ],

    ARS: [
        "🇦🇷 Argentina protege áreas naturais na Patagônia.",
        "🇦🇷 Programas protegem baleias.",
        "🇦🇷 Mendoza é referência em vinhos sustentáveis.",
        "🇦🇷 Iguazú possui biodiversidade rica.",
        "🇦🇷 Conservação ambiental cresce."
    ],

    BTC: [
        "🌍 Bitcoin foi criado em 2009 por Satoshi Nakamoto.",
        "🌍 A primeira compra com Bitcoin foi duas pizzas.",
        "🌍 Mineradoras usam energia renovável em vários países.",
        "🌍 Bitcoin funciona sem banco central.",
        "🌍 A oferta máxima é de 21 milhões de moedas."
    ],

    ETH: [
        "🌍 Ethereum foi criado por Vitalik Buterin.",
        "🌍 Permite contratos inteligentes.",
        "🌍 Mudou para Proof of Stake reduzindo energia.",
        "🌍 É a base de muitos projetos DeFi.",
        "🌍 NFTs usam muito a rede Ethereum."
    ],

    DOGE: [
        "🌍 Dogecoin começou como uma brincadeira.",
        "🌍 Seu símbolo é o cachorro Shiba Inu.",
        "🌍 Possui uma comunidade muito ativa.",
        "🌍 Já financiou projetos sociais.",
        "🌍 É uma das criptomoedas mais conhecidas."
    ]

}


function getCurrencyImage(code) {

    const flags = {
        BRL: "br",
        USD: "us",
        EUR: "eu",
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

    if (crypto[code]) return crypto[code]

    if (flags[code]) return `https://flagcdn.com/48x36/${flags[code]}.png`

    return "https://flagcdn.com/48x36/un.png"

}


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


swapButton.addEventListener("click", () => {

    const temp = selectFrom.value
    selectFrom.value = selectTo.value
    selectTo.value = temp

})


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

        const li = document.createElement("li")

        li.textContent = `${inputValue} ${from} → ${result.toFixed(2)} ${to}`

        historyList.prepend(li)

        if (historyList.children.length > 5) historyList.removeChild(historyList.lastChild)

        const currentHistory = Array.from(historyList.children).map(li => li.textContent)

        localStorage.setItem("conversionHistory", JSON.stringify(currentHistory))


        if (currencyFacts[to]) {

            const random = Math.floor(Math.random() * currencyFacts[to].length)

            currencyFact.innerText = currencyFacts[to][random]

        } else {

            currencyFact.innerText = "Nenhuma curiosidade disponível."

        }


        loadChart(to)

    } catch (error) {

        alert("Erro ao buscar cotação")

    }

    loading.style.display = "none"

}


convertButton.addEventListener("click", convertValues)


const savedHistory = JSON.parse(localStorage.getItem("conversionHistory")) || []

savedHistory.forEach(text => {

    const li = document.createElement("li")

    li.textContent = text

    historyList.appendChild(li)

})


clearHistoryButton.addEventListener("click", () => {

    historyList.innerHTML = ""
    localStorage.removeItem("conversionHistory")

})


async function loadChart(currency) {

    chartMessage.innerText = ""

    if (currency === "BRL") {

        chartMessage.innerText = "Não há gráfico disponível para o Real."
        return

    }

    try {

        const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${currency}-BRL/14`)

        const data = await response.json()

        const prices = []
        const labels = []

        data.reverse().forEach(day => {

            prices.push(Number(day.bid))

            const date = new Date(day.timestamp * 1000)

            labels.push(date.toLocaleDateString())

        })

        const rci = calculateRCI(prices, 9)

        createChart(labels, prices, rci)

    } catch (err) {

        chartMessage.innerText = "Não foi possível carregar o gráfico."

    }

}


function calculateRCI(prices, period) {

    const rci = []

    for (let i = 0; i < prices.length; i++) {

        if (i < period) { rci.push(null); continue }

        const window = prices.slice(i - period, i)

        const rank = [...window].sort((a, b) => b - a)

        let sum = 0

        for (let j = 0; j < period; j++) {

            const priceRank = rank.indexOf(window[j]) + 1
            const timeRank = j + 1

            sum += Math.pow(priceRank - timeRank, 2)

        }

        const value = (1 - (6 * sum) / (period * (period * period - 1))) * 100

        rci.push(value)

    }

    return rci

}


function calculateMA(prices, period) {

    const ma = []

    for (let i = 0; i < prices.length; i++) {

        if (i < period) { ma.push(null); continue }

        let sum = 0

        for (let j = 0; j < period; j++) sum += prices[i - j]

        ma.push(sum / period)

    }

    return ma

}


function calculateSupportResistance(prices) {

    return {
        support: Math.min(...prices),
        resistance: Math.max(...prices)
    }

}


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

        options: {

            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: "#ffffff"
                    }
                }
            },

            scales: {

                y: {
                    position: "left",
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.2)"
                    }
                },

                rci: {
                    position: "right",
                    min: -100,
                    max: 100,
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },

                x: {
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.1)"
                    }
                }

            }

        }

    })
clearChartButton.addEventListener("click", () => {

    if (chart) {
        chart.destroy()
        chart = null
    }

    chartMessage.innerText = "Gráfico limpo."

})
copyResultButton.addEventListener("click", () => {

    const text = `${currencyValueFrom.innerText} → ${currencyValueTo.innerText}`

    navigator.clipboard.writeText(text)

    alert("Resultado copiado!")

})
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})

}
