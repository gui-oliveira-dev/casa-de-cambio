import Swal from "sweetalert2"
import './style.css'

const button = document.querySelector('#search-btn')
const coinsPanel = document.querySelector('.coin-list')
const coinInput = document.querySelector('#coin-code')
const coinCompare = document.querySelector('#coin-compare')
const coinTitle = document.querySelector('#coin-title')
const daysInput = document.querySelector('#days')



button.addEventListener("click", (event) => {
  event.preventDefault();
  const input = coinInput.value.toUpperCase();
  const compare = coinCompare.value.toUpperCase();
  const days = daysInput.value

  coinsPanel.innerHTML = ''
  coinTitle.innerText = 'Pesquise uma moeda para ver sua cotação'

  if (coinInput.value === '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Você precisa inserir uma moeda para continuar',
      icon: 'warning',
      confirmButtonText: 'Tentar novamente'
    })
    return false
  }
  fetch(`https://economia.awesomeapi.com.br/json/daily/${input}-${compare}/${days}`)
    .then((response) => response.json())
    .then((coinsInfos) => {
      const {code, codein} = coinsInfos[0]
      
      coinsInfos.forEach((coinInfo) => {
        
        const date = new Date(coinInfo.timestamp * 1000)
        const dateValue = date.toLocaleDateString('pt-BR')

        const coin = document.createElement('li')
        coin.className = 'coin'
        coin.innerHTML = `<span id="date">${dateValue}</span>  -  <span id="cotation">${coinInfo.ask}</span>`
      
        coinsPanel.appendChild(coin)

        coinInput.value = '';
  
    })
    coinTitle.innerHTML = `Cotação de ${code}/${codein} dos últimos 30 dias`
  })
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