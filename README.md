# -PokeAPI
Trabalho
Desenvolvimento de Interface Frontend com PokeAPI



              
let inputElement = document.querySelector(".searchInput")
let listElement = document.querySelector("#pokemon-list")
let itemElement = listElement.querySelectorAll("li")

inputElement.addEventListener("input", (e) => {
  let inputed = e.target.value.toLowerCase()
  itemElement.forEach((li) => {
    let text = li.textContent.toLowerCase()
    if(text.includes(inputed)){
      li.style.display = "block"
    }else{
      li.style.display = "none"
    }
  })
})