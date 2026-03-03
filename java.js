// Seletores
const convertButton = document.querySelector(".button")
const selectFrom = document.querySelector(".select-from")
const selectTo = document.querySelector(".select")

convertButton.disabled = true

// Lista de moedas e criptos
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

// Popula ambos os selects
function populateSelects() {
    selectFrom.innerHTML = ""
    selectTo.innerHTML = ""

    const options = []

    for (let code in currencyNames) {
        const option = document.createElement("option")
        option.value = code
        option.textContent = `${currencyNames[code]} (${code})`
        options.push(option)
    }

    // Ordena alfabeticamente
    options.sort((a,b) => a.textContent.localeCompare(b.textContent))

    // Adiciona em ambos os selects
    options.forEach(option => {
        selectFrom.appendChild(option.cloneNode(true))
        selectTo.appendChild(option.cloneNode(true))
    })

    convertButton.disabled = false
}

// Atualiza imagem e nome das moedas
function updateCurrencyInfo(fromCurrency, toCurrency) {
    const fromName = document.getElementById("currency-from-name")
    const fromImg = document.getElementById("currency-from-img")
    const toName = document.getElementById("currency-name")
    const toImg = document.getElementById("currency-img")

    const fromOption = selectFrom.querySelector(`option[value="${fromCurrency}"]`)
    const toOption = selectTo.querySelector(`option[value="${toCurrency}"]`)

    fromName.innerHTML = fromOption ? fromOption.textContent : fromCurrency
    toName.innerHTML = toOption ? toOption.textContent : toCurrency

    // Imagem moeda de origem
    if(fromCurrency==="BTC") fromImg.src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    else if(fromCurrency==="ETH") fromImg.src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
    else if(fromCurrency==="DOGE") fromImg.src="https://cryptologos.cc/logos/dogecoin-doge-logo.png"
    else if(fromCurrency==="EUR") fromImg.src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
    else fromImg.src=`https://flagsapi.com/${fromCurrency.slice(0,2)}/flat/64.png`

    // Imagem moeda de destino
    if(toCurrency==="BTC") toImg.src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    else if(toCurrency==="ETH") toImg.src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
    else if(toCurrency==="DOGE") toImg.src="https://cryptologos.cc/logos/dogecoin-doge-logo.png"
    else if(toCurrency==="EUR") toImg.src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
    else toImg.src=`https://flagsapi.com/${toCurrency.slice(0,2)}/flat/64.png`
}

// Função de conversão
async function convertValues() {
    const inputValue = Number(document.querySelector(".input-currency").value)
    if (!inputValue) return

    const currencyvalue = document.querySelector(".currencyvalue")
    const currencyvalue2 = document.querySelector(".currencyvalue2")
    const from = selectFrom.value
    const to = selectTo.value

    try {
        // Pega taxa da moeda de destino em BRL
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${to}-BRL`)
        const data = await response.json()
        const rateTo = Number(data[`${to}BRL`].bid)

        let brlValue = inputValue

        // Se a moeda de origem não for BRL, converte para BRL primeiro
        if(from !== "BRL") {
            const responseFrom = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-BRL`)
            const dataFrom = await responseFrom.json()
            const rateFrom = Number(dataFrom[`${from}BRL`].bid)
            brlValue = inputValue * rateFrom
        }

        // Valor em moeda de origem (sempre BRL)
        currencyvalue.innerHTML = new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL"}).format(brlValue)

        // Valor em moeda de destino
        if(["BTC","ETH","DOGE"].includes(to)) {
            currencyvalue2.innerHTML = (brlValue / rateTo).toFixed(6) + " " + to
        } else {
            currencyvalue2.innerHTML = new Intl.NumberFormat("en-US",{style:"currency",currency:to}).format(brlValue / rateTo)
        }

        // Atualiza imagens e nomes
        updateCurrencyInfo(from, to)

    } catch(err) {
        console.log("Erro na conversão:", err)
    }
}

// Inicializa
populateSelects()
convertButton.addEventListener("click", convertValues)