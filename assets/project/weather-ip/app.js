async function getLatLng(city, state) {
  const query = `${city}, ${state}`;
  const url =
    `https://nominatim.openstreetmap.org/search?` +
    new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: 1
    });

  const res = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });

  const data = await res.json();
  
  if (!data.length) {
    throw new Error("No location found");
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    label: data[0].display_name
  };
}

async function fetchData(city, state) {
  const { lat, lng } = await getLatLng(city, state);
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&temperature_unit=fahrenheit&current_weather=true&precipitation`;
  const response = await fetch(weatherURL);
  const jsonData = await response.json();
  const temp = jsonData.current_weather.temperature;
  insertTemp(temp);
  insertCity(city, state);
}

function insertTemp(temp) {
  const tempP = document.querySelector("#temp")
  tempP.innerText = `${temp}°F`
}

function insertCity(city, state){
      const cityText = document.querySelector("#cityoutput")
      cityText.innerText = `Temp for ${city}, ${state}`

}

document.getElementById("weather-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  await fetchData(city, state);
});

