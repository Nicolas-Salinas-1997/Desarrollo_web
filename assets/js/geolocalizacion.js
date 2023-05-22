const btnLocation = document.getElementById('btn-location');

btnLocation.addEventListener('click', () => {

if ('geolocation' in navigator) {
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
        window.open(mapUrl, '_blank');
      },
      (error) => {
        console.error(`Error al obtener la ubicación: ${error.message}`);
      }
    );
  } else {
    console.error('Tu navegador no soporta la geolocalización.');
  }
});
