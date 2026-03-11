const savedTheme = localStorage.getItem("theme")

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
}
// ===============================
// ENVIO DO FORMULÁRIO DE ANÚNCIO
// ===============================

const form = document.getElementById("formAnuncio")

if(form){

console.log("Formulário encontrado")

form.addEventListener("submit", async function(event){

event.preventDefault()

console.log("Enviando formulário...")

const formData = new FormData(form)

try{

const response = await fetch(form.action, {

method: "POST",

headers:{
"Accept":"application/json"
},

body: formData

})

if(response.ok){

console.log("Formulário enviado com sucesso")

alert("Obrigado! Seu pedido de anúncio foi enviado.")

form.reset()

// fecha o modal após enviar
const modal = document.getElementById("modalAnuncio")

if(modal){
modal.style.display = "none"
}

}else{

console.log("Erro ao enviar formulário", response.status)

alert("Erro ao enviar formulário.")

}

}catch(error){

console.log("Erro:", error)

}

})

}


// ===============================
// CONTROLE DO MODAL DE ANÚNCIO
// ===============================

// abrir formulário
function abrirFormulario(){

console.log("Abrindo formulário de anúncio")

const modal = document.getElementById("modalAnuncio")

if(modal){
modal.style.display = "flex"
}

}


// fechar formulário
function fecharFormulario(){

console.log("Fechando formulário")

const modal = document.getElementById("modalAnuncio")

if(modal){
modal.style.display = "none"
}

}