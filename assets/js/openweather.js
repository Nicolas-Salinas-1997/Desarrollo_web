$(document).ready(function () {
    let ciudad_buscada = "Santiago";
    let units = 'metric';
    let lang = 'es';
    let apiid = 'ed3b106e101558df8af3423e96b3a14b';

    function obtenerDatosClima() {
        let urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad_buscada},Chile&lang=${lang}&units=${units}&appid=${apiid}`;

        $.getJSON(urlClima, function (dataClima) {
            let urlPais = `https://restcountries.com/v3.1/alpha/CHL`;

            $.getJSON(urlPais, function (dataPais) {
                let climaHTML = `
                    <h4>${ciudad_buscada} (${dataPais[0].translations.spa.common}): ${dataClima.weather[0].description}</h4>
                    <h4>Temperatura: ${dataClima.main.temp}°C</h4>
                    <h4>Sensación Térmica: ${dataClima.main.feels_like}°C</h4>
                    <h4>Humedad: ${dataClima.main.humidity}%</h4>
                    <h4>Viento: ${dataClima.wind.speed}m/s</h4>
                    <h4>Coordenadas: ${dataClima.coord.lat},${dataClima.coord.lon}</h4>
                `;

                $('#info-clima').html(climaHTML);

                let iconoURL = `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`;
                let iconoHTML = `<img src="${iconoURL}" />`;

                $('#img-clima').html(iconoHTML);
            });
        }).fail(function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo obtener la información del clima.',
                confirmButtonText: 'Ok'
            });
        });
    }

    // Realizar la primera llamada a la API para obtener los datos del clima
    obtenerDatosClima();

    // Actualizar los datos del clima cada 1 segundo
    setInterval(obtenerDatosClima, 1000);
});




