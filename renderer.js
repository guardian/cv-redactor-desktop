const {sendPdf,responsePdf} = require('./events.js');
const {ipcRenderer} = require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
  if(arg.type && arg.payload && arg.type === responsePdf) {
	  document.getElementById("contents").innerHTML = arg.payload;
  }
})

document.querySelector('#form').addEventListener('submit',ev=>{
	ev.preventDefault();
	var file = event.target[0].files[0];

	if (file) {
		const reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			ipcRenderer.send('asynchronous-message', {
				type: sendPdf,
				payload: evt.target.result
			})
		}
		reader.onerror = function (evt) {
			alert('oh no');
		}
	}
})
