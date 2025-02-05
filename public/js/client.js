const socket = new WebSocket(WS_URL);
const body = document.querySelector('body');
const logo = document.getElementById('logo');
const messageDiv = document.getElementById('message');

socket.addEventListener('message', handleServerMessage)

function handleServerMessage(event) {
    const data = JSON.parse(event.data)
    console.log('Receive server message: ', data)

    switch(data.status) {
        case STATUS.WIN:
            setClientState('win', data.code);
            break;
        case STATUS.LOSE:
            setClientState('lose');
    } 
}

function setClientState(state, code = "") {
    body.className = "main";
    messageDiv.classList.toggle("hide-message", true);
    logo.classList.toggle("stop-spin", false);
    logo.classList.toggle("spin-animation", true);
  
    setTimeout(() => {
      if (state === "win") {
        body.classList.add("win");
        messageDiv.innerText = code;
        vibratePhone(1000);
      } else if (state === "lose") {
        body.classList.add("lose");
        messageDiv.innerText = "";
      }
  
      messageDiv.classList.toggle("show-message", state === "win");
      messageDiv.classList.toggle("hide-message", state !== "win");
      logo.classList.toggle("spin-animation", false);
      logo.classList.toggle("stop-spin", true);
    }, 4200);
  }
  
  function vibratePhone(timeMs) {
    if (navigator.vibrate) {
      navigator.vibrate(timeMs);
    }
  }