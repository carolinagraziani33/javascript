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
    BRL: [
        "🇧🇷 O Brasil possui cerca de 20% da biodiversidade do planeta e a Amazônia é uma das maiores reservas naturais do mundo.",
        "🇧🇷 Durante enchentes em Minas Gerais, empresas brasileiras como a CIMED já ajudaram farmácias locais repondo produtos e apoiando comunidades afetadas.",
        "🇧🇷 O Brasil tem uma das maiores reservas de água doce do planeta, essencial para o equilíbrio ambiental global.",
        "🇧🇷 A cidade de Curitiba é referência mundial em transporte público e planejamento urbano sustentável.",
        "🇧🇷 Algumas comunidades indígenas no Brasil preservam técnicas agrícolas ancestrais que ajudam na conservação do solo e biodiversidade."
    ],
    USD: [
        "🇺🇸 O dólar é a moeda mais usada no mundo.",
        "🇺🇸 Universidades americanas lideram pesquisas sobre energias renováveis e tecnologias para reduzir emissões de carbono.",
        "🇺🇸 Parques nacionais como Yellowstone ajudam a proteger ecossistemas e espécies ameaçadas.",
        "🇺🇸 A Califórnia possui extensos programas de proteção de espécies marinhas e habitats costeiros.",
        "🇺🇸 Algumas cidades americanas têm projetos de agricultura urbana para reduzir desperdício e aumentar a segurança alimentar."
    ],
    EUR: [
        "🇪🇺 O euro foi criado em 1999 e é usado por 19 países da UE.",
        "🇪🇺 A União Europeia investe em projetos de energia limpa e sustentabilidade.",
        "🇪🇺 Alemanha e Dinamarca possuem cidades-modelo em eficiência energética.",
        "🇪🇺 Muitos países incentivam agricultura orgânica e produção local.",
        "🇪🇺 A Europa lidera pesquisas em transporte sustentável e cidades verdes."
    ],
    GBP: [
        "🇬🇧 O Reino Unido possui grandes projetos de energia eólica offshore.",
        "🇬🇧 Londres possui iniciativas para reduzir poluição e transporte sustentável.",
        "🇬🇧 Algumas regiões da Escócia preservam florestas nativas.",
        "🇬🇧 Universidades britânicas lideram pesquisas em conservação marinha.",
        "🇬🇧 O país investe em preservação de áreas naturais."
    ],
    JPY: [
        "🇯🇵 O Japão é líder em tecnologia sustentável e eficiência energética.",
        "🇯🇵 Muitas cidades japonesas possuem sistemas avançados de reciclagem.",
        "🇯🇵 Kyoto mantém projetos históricos de preservação de jardins e florestas urbanas.",
        "🇯🇵 O país investe em pesquisa para reduzir impactos ambientais.",
        "🇯🇵 Desenvolvem robôs para limpar oceanos e reduzir poluição plástica."
    ],
    AUD: [
        "🇦🇺 A Austrália possui a Grande Barreira de Corais.",
        "🇦🇺 O país investe em preservação de espécies únicas como o coala.",
        "🇦🇺 Existem grandes projetos de energia solar no interior.",
        "🇦🇺 Algumas cidades têm programas de reciclagem avançados.",
        "🇦🇺 Reservas naturais extensas conservam fauna e flora nativas."
    ],
    CAD: [
        "🇨🇦 O Canadá possui uma das maiores reservas de florestas do planeta.",
        "🇨🇦 Protege grandes áreas naturais e parques nacionais.",
        "🇨🇦 Cidades incentivam transporte sustentável.",
        "🇨🇦 Projetos de preservação de ursos polares e alces.",
        "🇨🇦 Toronto e Vancouver possuem iniciativas urbanas verdes."
    ],
    CHF: [
        "🇨🇭 A Suíça é referência mundial em reciclagem.",
        "🇨🇭 Políticas ambientais rigorosas protegem os Alpes.",
        "🇨🇭 Transporte ferroviário eficiente reduz emissão de carbono.",
        "🇨🇭 Muitas cidades incentivam transporte público.",
        "🇨🇭 Investimentos em energia hidrelétrica e solar sustentáveis."
    ],
    CNY: [
        "🇨🇳 A China lidera investimentos globais em energia solar e eólica.",
        "🇨🇳 Grandes projetos de reflorestamento.",
        "🇨🇳 Cidades implementam sistemas de transporte elétrico.",
        "🇨🇳 Projetos de cidades inteligentes monitoram poluição.",
        "🇨🇳 Conservação de pandas e outros animais ameaçados."
    ],
    ARS: [
        "🇦🇷 A Argentina reconheceu o feminicídio como crime.",
        "🇦🇷 Grandes áreas de preservação natural na Patagônia.",
        "🇦🇷 Programas de conservação de pinguins e baleias.",
        "🇦🇷 Mendoza é referência em viticultura sustentável.",
        "🇦🇷 O Parque Nacional Iguazú protege biodiversidade."
    ],
    BTC: [
        "🌍 Bitcoin foi criado em 2009.",
        "🌍 Mineradoras estão investindo em energia solar e hidrelétrica.",
        "🌍 Projetos de blockchain rastreiam iniciativas ambientais.",
        "🌍 Exchanges oferecem fundos verdes ligados a criptomoedas.",
        "🌍 Bitcoin está sendo usado em reflorestamento e projetos sustentáveis."
    ],
    ETH: [
        "🌍 Ethereum reduziu mais de 99% do consumo de energia após mudar para Proof of Stake.",
        "🌍 Blockchain rastreia créditos de carbono.",
        "🌍 Tecnologias descentralizadas apoiam projetos ambientais.",
        "🌍 Ethereum financia startups verdes e iniciativas sociais.",
        "🌍 NFTs sustentáveis financiam projetos de conservação ambiental."
    ],
    DOGE: [
        "🌍 Comunidades de DOGE financiam projetos ambientais.",
        "🌍 Iniciativas usam criptomoedas para preservação ambiental.",
        "🌍 Blockchain aumenta transparência em projetos ambientais.",
        "🌍 Dogecoin já apoiou reflorestamento e fornecimento de água.",
        "🌍 Projetos comunitários em DOGE ajudam cidades a implementar energias limpas."
    ]
}

// BANDEIRAS E CRIPTOS
function getCurrencyImage(code) {
    const flags = {
        BRL: "br", USD: "us", EUR: "de", GBP: "gb",
        JPY: "jp", AUD: "au", CAD: "ca", CHF: "ch",
        CNY: "cn", ARS: "ar"
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
        let rateFrom = 1, rateTo = 1
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
        if (historyList.children.length > 5) historyList.removeChild(historyList.lastChild)

        // SALVAR NO LOCALSTORAGE
        const currentHistory = Array.from(historyList.children).map(li => li.textContent)
        localStorage.setItem("conversionHistory", JSON.stringify(currentHistory))

        // CURIOSIDADE
        if (currencyFacts[to]) {
            const random = Math.floor(Math.random() * currencyFacts[to].length)
            currencyFact.innerText = currencyFacts[to][random]
        } else {
            currencyFact.innerText = "Nenhuma curiosidade disponível para esta moeda."
        }

        // GRÁFICO
        loadChart(to)
    } catch (error) {
        console.log(error)
        alert("Erro ao buscar cotação")
    }

    loading.style.display = "none"
}
convertButton.addEventListener("click", convertValues)

// RESTAURAR HISTÓRICO
const savedHistory = JSON.parse(localStorage.getItem("conversionHistory")) || []
savedHistory.forEach(text => {
    const li = document.createElement("li")
    li.textContent = text
    historyList.appendChild(li)
})

// APAGAR HISTÓRICO
clearHistoryButton.addEventListener("click", () => {
    historyList.innerHTML = ""
    localStorage.removeItem("conversionHistory")
})

// CARREGAR GRÁFICO
async function loadChart(currency) {
    chartMessage.innerText = ""
    if (currency === "BRL") {
        chartMessage.innerText = "Não há gráfico disponível para o Real."
        return
    }
    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${currency}-BRL/14`)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error("Dados inválidos")
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
        console.log("Erro gráfico", err)
        chartMessage.innerText = "Não foi possível carregar o gráfico."
    }
}

// RCI
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

// MÉDIA MÓVEL
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
                { label: "Preço", data: prices, yAxisID: "y", borderWidth: 2, borderColor: "#ffffff", backgroundColor: "rgba(255,255,255,0.1)" },
                { label: "Média móvel", data: ma, yAxisID: "y", borderDash: [5, 5], borderWidth: 2, borderColor: "#ffd166" },
                { label: "Suporte", data: Array(prices.length).fill(sr.support), yAxisID: "y", borderWidth: 2, borderColor: "#ff6b6b" },
                { label: "Resistência", data: Array(prices.length).fill(sr.resistance), yAxisID: "y", borderWidth: 2, borderColor: "#4ecdc4" },
                { label: "RCI", data: rci, yAxisID: "rci", borderWidth: 2, borderColor: "#4dabf7" }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            hover: { mode: "index", intersect: false },
            plugins: { legend: { position: "bottom", labels: { color: "#ffffff" } } },
            scales: {
                y: { position: "left", ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.2)" } },
                rci: { position: "right", min: -100, max: 100, ticks: { color: "#ffffff" }, grid: { drawOnChartArea: false } },
                x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.1)" } }
            }
        }
    })
}