let ciudad = document.querySelector('#ciudadIngresada');
let boton = document.querySelector('#boton')

const KelvinToCelsius = (t) => {
    t -= 273.15;
    return Math.round(t);
}

const getData = async (ciudad) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=da73527dc0e101aa61b904451ffffc1a`);


    if (response.status == 404) {
        document.querySelector('.pronostico').style.display = "none";
        document.querySelector('.error').style.display = "initial";
    } else if (response.status == 400) {
        document.querySelector('.pronostico').style.display = "none";
        document.querySelector('.error').style.display = "initial";
    } else {

        document.querySelector('.error').style.display = "none";

        let data = await response.json();

        let icono = document.querySelector('.icono')
        document.querySelector('.ciudad').innerHTML = data.name
        document.querySelector('.temp').innerHTML = `${KelvinToCelsius(data.main.temp)}º`
        document.querySelector('.min').innerHTML = `Minima: ${KelvinToCelsius(data.main.temp_min)}º`
        document.querySelector('.max').innerHTML = `Maxima: ${KelvinToCelsius(data.main.temp_max)}º`
        document.querySelector('.humedad').innerHTML = `Humedad: ${data.main.humidity}%`
        document.querySelector('.presion').innerHTML = `Presion: ${data.main.pressure}mb`

        let arrayIcono = data.weather[0].main;

        if (arrayIcono == "Clouds") {
            icono.src = "assets/clouds.png"
        } else if (arrayIcono == "Clear") {
            icono.src = "assets/clear.png"
        } else if (arrayIcono == "Rain") {
            icono.src = "assets/rain.png"
        } else if (arrayIcono == "Drizzle") {
            icono.src = "assets/drizzle.png"
        } else if (arrayIcono == "Mist") {
            icono.src = "assets/mist.png"
        } else if (arrayIcono == "Snow") {
            icono.src = "assets/snow.png"
        }

        document.querySelector('.pronostico').style.display = "initial";

    }

}

boton.addEventListener('click', e => {
    e.preventDefault();

    getData(ciudad.value);

    ciudad.value = '';
})