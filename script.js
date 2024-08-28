let urlbase = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = 'eccf8034baa4a8ecd02e62d7ec735d49';
let difKelvin = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
  const ciudad = document.getElementById('ciudadEntrada').value;
  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});

function fetchDatosClima(ciudad) {
  fetch(`${urlbase}?q=${ciudad}&appid=${api_key}`)
    .then(response => response.json())
    .then(data => mostrarDatosClima(data))
    .catch(error => console.error('Error fetching data:', error));
}

function mostrarDatosClima(data) {
  console.log(data);
  const divDatosClima = document.getElementById('datosClima');
  divDatosClima.innerHTML = '';

  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp;
  const humedad = data.main.humidity; // Declarar la humedad correctamente
  const descripcion = data.weather[0].description; // Acceder correctamente a "description"
  const icono = data.weather[0].icon;

  const ciudadTitulo = document.createElement('h2');
  ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

  const temperaturaInfo = document.createElement('p');
  temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)}ºC`;

  const humedadInfo = document.createElement('p');
  humedadInfo.textContent = `La humedad es: ${humedad}%`;

  const iconoInfo = document.createElement('img');
  iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`; // Usar "src" para la imagen

  const descripcionInfo = document.createElement('p');
  descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;

  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(iconoInfo);
  divDatosClima.appendChild(descripcionInfo);
}