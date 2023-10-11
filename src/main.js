import Swal from "sweetalert2"
import './style.css'

const button = document.querySelector('#search-btn')
const coinsPanel = document.querySelector('.coin-results')
const coinInput = document.querySelector('#coin-input')




button.addEventListener("click", (event) => {
  event.preventDefault();
  const input = coinInput.value.toUpperCase();
  coinsPanel.innerHTML = ''

  if (coinInput.value === '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Você precisa inserir uma moeda para continuar',
      icon: 'warning',
      confirmButtonText: 'Tentar novamente'
    })
    return false
  }
  fetch(`https://economia.awesomeapi.com.br/json/daily/${input}/30`)
    .then((response) => response.json())
    .then((coinsInfos) => coinsInfos.forEach((coinInfo) => {

      const coin = document.createElement('p')
      coin.className = 'coin'
      coin.textContent = `🪙ASD ${coinInfo.ask}`
    
      coinsPanel.appendChild(coin)

      coinInput.value = '';
  
    }))
    .catch((error) => {
      Swal.fire({
        title: 'Moeda não encontrada',
        text: 'Insira uma moeda válida para continuar',
        icon: 'error',
        confirmButtonText: 'Tentar novamente'
      })
      coinInput.value = ''
    })
  
})