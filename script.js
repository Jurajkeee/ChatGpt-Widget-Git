//ws config
const SERVER_IP = 'localhost'; 
const PORT = 3000; 
//ws config

document.querySelector('#chat_hook').innerHTML = ''; //clear chat_hook history on page load 


document.querySelector('#send').addEventListener('click', function() {

    let client_msg = document.querySelector('#client_msg').value; //needs validation
    document.querySelector('#client_msg').value = ''; //clear input field 
   
   
    //autofocus on input field
    document.querySelector('#client_msg').focus();


    //get time hh:mm now 
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var time = hh + ":" + mm;

    //generate random seed 6 digits 
    var seed = Math.floor(Math.random() * 1000000);

          
    //append client_msg o chat_hook dialog div
    document.querySelector('#chat_hook').innerHTML += `<li id="${seed}" class="chat_message_user">
        <div class="message_header">
            <p class="username">You</p>
            <p class="sentdate">${time}</p>
        </div>
        <div class="message_body">
            <p class="message_text">${client_msg}</p>
        </div>
    </li>`;


    
    var ws = new WebSocket(`ws://${SERVER_IP}:${PORT}`);
    ws.onopen = function() {
        ws.send(client_msg);
    };
    ws.onmessage = function(message) {
        console.log('received: %s', message.data);

        document.querySelector('#chat_hook').innerHTML += message.data;

    //auto scroll to bottom of chat_hook ul (scrollIntoView) of last li element
    document.querySelector('#chat_hook').lastElementChild.scrollIntoView();
    };
});

//addevent enter key to send message
document.querySelector('#client_msg').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#send').click();
    }
});