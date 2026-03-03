// java.js

const convertButton = document.querySelector(".button")
const select = document.querySelector(".select")

// Desabilita o botão até carregar as moedas
convertButton.disabled = true

// Lista manual de moedas e criptos
const currencyNames = {
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

// Função para popular o select de moedas
function populateSelect() {
    select.innerHTML = ""
    const options = []

    for (let code in currencyNames) {
        const option = document.createElement("option")
        option.value = code
        option.textContent = `${currencyNames[code]} (${code})`
        options.push(option)
    }

    // Ordenar alfabeticamente pelo texto
    options.sort((a, b) => a.textContent.localeCompare(b.textContent))
    options.forEach(option => select.appendChild(option))

    // Habilitar o botão após carregar opções
    convertButton.disabled = false
}

// Função para converter valores
async function convertValues() {
    const inputValue = Number(document.querySelector(".input-currency").value)
    if (!inputValue) return

    const currencyvalue = document.querySelector(".currencyvalue")
    const currencyvalue2 = document.querySelector(".currencyvalue2")
    const selectedCurrency = select.value

    try {
        // Busca a cotação da moeda em relação ao BRL
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${selectedCurrency}-BRL`)
        const data = await response.json()
        const rate = Number(data[`${selectedCurrency}BRL`].bid)

        // Valor em BRL
        currencyvalue.innerHTML = new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL"}).format(inputValue)

        // Valor convertido
        if (["BTC","ETH","DOGE"].includes(selectedCurrency)) {
            currencyvalue2.innerHTML = (inputValue / rate).toFixed(6) + " " + selectedCurrency
        } else {
            currencyvalue2.innerHTML = new Intl.NumberFormat("en-US",{style:"currency",currency:selectedCurrency}).format(inputValue / rate)
        }

        updateCurrencyInfo(selectedCurrency)
    } catch(err) {
        console.log("Erro na conversão:", err)
    }
}

// Atualizar nome e imagem da moeda de destino
function updateCurrencyInfo(currency) {
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.getElementById("currency-img")
    const selectedOption = select.querySelector(`option[value="${currency}"]`)
    currencyName.innerHTML = selectedOption ? selectedOption.textContent : currency

    if(currency==="BTC") currencyImg.src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    else if(currency==="ETH") currencyImg.src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
    else if(currency==="DOGE") currencyImg.src="https://cryptologos.cc/logos/dogecoin-doge-logo.png"
    else if(currency==="EUR") currencyImg.src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
    else currencyImg.src=`https://flagsapi.com/${currency.slice(0,2)}/flat/64.png`
}

// Inicializar select
populateSelect()

// Eventos
convertButton.addEventListener("click", convertValues)