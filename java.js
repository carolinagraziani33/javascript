const convertButton = document.querySelector(".button")
const selectFrom = document.querySelector(".select-from")
const selectTo = document.querySelector(".select")
const inputCurrency = document.querySelector(".input-currency")
const currencyValueFrom = document.querySelector(".currencyvalue")
const currencyValueTo = document.querySelector(".currencyvalue2")

convertButton.disabled = true

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

// Popula selects
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

    options.sort((a,b)=> a.textContent.localeCompare(b.textContent))
    options.forEach(option => {
        selectFrom.appendChild(option.cloneNode(true))
        selectTo.appendChild(option.cloneNode(true))
    })
    convertButton.disabled = false
}

// Atualiza imagens e nomes
function updateCurrencyInfo(fromCurrency, toCurrency){
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

// Converte valores
async function convertValues(){

    const from = selectFrom.value
    const to = selectTo.value
    let inputValue = Number(inputCurrency.value)

    if(!inputValue){
        alert("Digite um valor válido")
        return
    }

    let brlValue = inputValue

    // Converter moeda origem para BRL
    if(from !== "BRL"){
        try{
            const responseFrom = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-BRL`)
            const dataFrom = await responseFrom.json()

            const rateFrom = Number(dataFrom[`${from}BRL`]?.bid)

            if(!rateFrom){
                alert(`Cotação de ${from} não disponível`)
                return
            }

            brlValue = inputValue * rateFrom

        }catch(err){
            console.log(err)
            return
        }
    }

    // Mostrar valor da moeda de origem corretamente
    currencyValueFrom.innerHTML =
        new Intl.NumberFormat("pt-BR", {
            style:"currency",
            currency: from
        }).format(inputValue)

    // Converter para moeda destino
    try{

        let convertedValue

        if(to === "BRL"){

            convertedValue = new Intl.NumberFormat("pt-BR",{
                style:"currency",
                currency:"BRL"
            }).format(brlValue)

        }else{

            const responseTo = await fetch(`https://economia.awesomeapi.com.br/json/last/${to}-BRL`)
            const dataTo = await responseTo.json()

            const rateTo = Number(dataTo[`${to}BRL`]?.bid)

            if(!rateTo){
                alert(`Cotação de ${to} não disponível`)
                return
            }

            if(["BTC","ETH","DOGE"].includes(to)){

                convertedValue = (brlValue / rateTo).toFixed(6) + " " + to

            }else{

                convertedValue = new Intl.NumberFormat("en-US",{
                    style:"currency",
                    currency:to
                }).format(brlValue / rateTo)

            }

        }

        currencyValueTo.innerHTML = convertedValue

    }catch(err){
        console.log(err)
        return
    }

    updateCurrencyInfo(from,to)
}

populateSelects()
convertButton.addEventListener("click", convertValues)