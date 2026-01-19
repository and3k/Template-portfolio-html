

async function fetchData() { 
  const ipWho = "https://ipwho.is/"
  const ipResponse = await fetch(ipWho)
  const jsonIpData = await ipResponse.json()
  const latitude = jsonIpData.latitude
  const longitude = jsonIpData.longitude
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&current_weather=true&,precipitation`
  const response = await fetch(weatherURL);
  const jsonData = await response.json();
  const temp = jsonData.current_weather.temperature
  const city = jsonIpData.city
  const state = jsonIpData.region
  insertTemp(temp)
  insertCity(city, state)
}

function insertTemp(temp) {
  const tempP = document.querySelector("#temp")
  tempP.innerText = `${temp} degrees`
}

function insertCity(city, state){
      const cityText = document.querySelector("#cityoutput")
      cityText.innerText = `Temp for ${city}, ${state}`

}

window.onload = () => {
  fetchData()
}

