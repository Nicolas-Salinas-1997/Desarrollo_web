/* // Llamada a la API de ChatGPT
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    addToChatLog('Usuario: ' + userInput);
  
 // Realizar una solicitud a la API de ChatGPT
const response = await fetch('/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // Agrega tu clave de API aquí
    },
    body: JSON.stringify({ input: userInput })
  });
  
  
    // Obtener la respuesta de la API de ChatGPT
    const data = await response.json();
    const botResponse = data.output;
  
    // Mostrar la respuesta en el chat
    addToChatLog('ChatGPT: ' + botResponse);
  }
  
  // Función para agregar mensajes al chat
  function addToChatLog(message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
  }
 */



  // Llamada a la API de ChatGPT
  async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    addToChatLog('Usuario: ' + userInput);

    // Realizar una solicitud a la API de ChatGPT
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Agrega tu clave de API de OpenAI aquí
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 50
      })
    });

    // Obtener la respuesta de la API de ChatGPT
    const data = await response.json();
    const botResponse = data.choices[0].text.trim();

    // Mostrar la respuesta en el chat
    addToChatLog('Asistente: ' + botResponse);
  }

  // Función para agregar mensajes al chat
  function addToChatLog(message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
  }



  /* const form = document.querySelector("#form-search");
  const moneda = document.querySelector("#moneda");
  const criptomoneda = document.querySelector("#criptomonedas");
  const formContainer = document.querySelector(".form-side");
  const containerAnswer = document.querySelector(".container-answer");
  
  const objBusqueda = {
    moneda: '',
    criptomoneda: ''
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();
  
    form.addEventListener('submit', submitForm);
    moneda.addEventListener('change', getValue);
    criptomoneda.addEventListener('change', getValue);
  });
  
  function submitForm(e) {
    e.preventDefault();
    const { moneda, criptomoneda } = objBusqueda;
    if (moneda === '' || criptomoneda === '') {
      showError('Seleccione ambas monedas...');
      return;
    }
    consultarAPI(moneda, criptomoneda);
  }
  
  async function consultarAPI(moneda, criptomoneda) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  
    try {
      const response = await fetch(url);
      const resultadoJson = await response.json();
      mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
    } catch (error) {
      console.log(error);
    }
  }
  
  function mostrarCotizacion(data) {
    clearHTML();
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;
    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `
      <p class="main-price">Precio: <span>${PRICE}</span></p>
      <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
      <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
      <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
      <p>Última Actualización: <span>${LASTUPDATE}</span></p>
    `;
    containerAnswer.appendChild(answer);
  }
  
  function showError(mensaje) {
    const error = document.createElement('p');
    error.classList.add("error");
    error.textContent = mensaje;
    formContainer.appendChild(error);
    setTimeout(() => error.remove(), 3000);
  }
  
  function getValue(e) {
    objBusqueda[e.target.name] = e.target.value;
  }
  
  async function consultarCriptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  
    try {
      const response = await fetch(url);
      const respuestaJson = await response.json();
      selectCriptos(respuestaJson.Data);
    } catch (error) {
      console.log(error);
    }
  }
  
  function selectCriptos(criptos) {
    criptos.forEach(cripto => {
      const { FullName, Name } = cripto.CoinInfo;
      const option = document.createElement("option");
      option.value = Name;
      option.textContent = FullName;
      criptomoneda.appendChild(option);
    });
  }
  
  function clearHTML() {
    containerAnswer.innerHTML = '';
  }
  


 */


const form = document.querySelector("#form-search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");

const objBusqueda = {
  moneda: '',
  criptomoneda: ''
};

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptos();

  form.addEventListener('submit', submitForm);
  moneda.addEventListener('change', getValue);
  criptomoneda.addEventListener('change', getValue);
});

function submitForm(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (moneda === '' || criptomoneda === '') {
    showError('Seleccione ambas monedas...');
    return;
  }
  consultarAPI(moneda, criptomoneda);
}

async function consultarAPI(moneda, criptomoneda) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  try {
    const response = await fetch(url);
    const resultadoJson = await response.json();
    mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
  } catch (error) {
    console.log(error);
  }
}

function mostrarCotizacion(data) {
  clearHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;
  const answer = document.createElement('div');
  answer.classList.add('display-info');
  answer.innerHTML = `
    <p class="main-price">Precio: <span>${PRICE}</span></p>
    <p>Precio más alto del día: <span>${HIGHDAY}</span></p>
    <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
    <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
    <p>Última Actualización: <span>${LASTUPDATE}</span></p>
  `;
  containerAnswer.appendChild(answer);
}

function showError(mensaje) {
  const error = document.createElement('p');
  error.classList.add("error");
  error.textContent = mensaje;
  formContainer.appendChild(error);
  setTimeout(() => error.remove(), 3000);
}

function getValue(e) {
  objBusqueda[e.target.name] = e.target.value;
}

async function consultarCriptos() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  try {
    const response = await fetch(url);
    const respuestaJson = await response.json();
    selectCriptos(respuestaJson.Data);
  } catch (error) {
    console.log(error);
  }
}

function selectCriptos(criptos) {
  criptos.forEach(cripto => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomoneda.appendChild(option);
  });
}

function clearHTML() {
  containerAnswer.innerHTML = '';
}


