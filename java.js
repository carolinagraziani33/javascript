let rates = {}

const convertButton = document.querySelector(".button")
const select = document.querySelector(".select")

convertButton.disabled = true

// 🔄 Buscar moedas disponíveis
async function getCurrencies() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/json/available")
        const data = await response.json()

        populateSelect(data)
        convertButton.disabled = false

    } catch (error) {
        console.log("Erro ao buscar moedas:", error)
    }
}

// 🔽 Preencher select
function populateSelect(data) {
    select.innerHTML = ""

    Object.keys(data).forEach(currency => {

        if (currency.endsWith("-BRL")) {

            const code = currency.split("-")[0]

            const option = document.createElement("option")
            option.value = code
            option.textContent = code

            select.appendChild(option)
        }
    })

    addCryptoOption("BTC")
    addCryptoOption("ETH")
    addCryptoOption("DOGE")
}

// 🔥 Adicionar cripto manualmente
function addCryptoOption(code) {
    if (![...select.options].some(option => option.value === code)) {
        const option = document.createElement("option")
        option.value = code
        option.textContent = code
        select.appendChild(option)
    }
}

// 🔄 Converter valores
async function convertValues() {

    const inputValue = Number(document.querySelector(".input-currency").value)

    if (!inputValue) return

    const currencyvalue = document.querySelector(".currencyvalue")
    const currencyvalue2 = document.querySelector(".currencyvalue2")

    const selectedCurrency = select.value

    try {

        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${selectedCurrency}-BRL`)
        const data = await response.json()

        const rate = Number(data[`${selectedCurrency}BRL`].bid)

        currencyvalue.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputValue)

        // 🔥 Tratamento para cripto
        if (["BTC", "ETH", "DOGE"].includes(selectedCurrency)) {

            currencyvalue2.innerHTML =
                (inputValue / rate).toFixed(6) + " " + selectedCurrency

        } else {

            currencyvalue2.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: selectedCurrency
            }).format(inputValue / rate)
        }

        updateCurrencyInfo(selectedCurrency)

    } catch (error) {
        console.log("Erro na conversão:", error)
    }
}

// 🔄 Atualizar nome e imagem (ONLINE)
function updateCurrencyInfo(currency) {

    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.getElementById("currency-img")

    currencyName.innerHTML = currency

    if (currency === "BTC") {
        currencyImg.src = "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    }
    else if (currency === "ETH") {
        currencyImg.src = "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    }
    else if (currency === "DOGE") {
        currencyImg.src = "https://cryptologos.cc/logos/dogecoin-doge-logo.png"
    }
    else if (currency === "EUR") {
        // ⚠ EUR não funciona com EU na flagsapi
        currencyImg.src = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
    }
    else {
        const countryCode = currency.slice(0, 2)
        currencyImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`
    }
}

convertButton.addEventListener("click", convertValues)

getCurrencies()