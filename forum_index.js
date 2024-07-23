// script.js




const disappear = document.querySelector(".disappearText");

const forum = document.querySelector(".forum");

document.addEventListener('DOMContentLoaded', () => {

    const messageForm = document.getElementById('messageForm');

    const messageInput = document.getElementById('messageInput');

    const messagesDiv = document.getElementById('messages');




    messageForm.addEventListener('submit', (event) => {

        event.preventDefault();




        const messageText = messageInput.value.trim();

        if (messageText !== '') {

            const messageElement = document.createElement('div');

            messageElement.textContent = messageText;

            messagesDiv.appendChild(messageElement);

            messageInput.value = '';

            messagesDiv.scrollTop = messagesDiv.scrollHeight;

        }

    });

});




// script.js

document.addEventListener('DOMContentLoaded', () => {

    const socket = io();




    const messageForm = document.getElementById('messageForm');

    const messageInput = document.getElementById('messageInput');

    const messagesDiv = document.getElementById('messages');




    // Charger les messages existants

    fetch('/messages')

        .then(response => response.json())

        .then(messages => {

            messages.reverse().forEach(addMessage);

        });




    messageForm.addEventListener('submit', (event) => {

        event.preventDefault();




        const messageText = messageInput.value.trim();

        if (messageText !== '') {

            socket.emit('message', messageText);

            messageInput.value = '';

        }

    });




    socket.on('message', addMessage);




    function addMessage(message) {

        const messageElement = document.createElement('div');

        messageElement.textContent = message.text;

        messagesDiv.appendChild(messageElement);

        messagesDiv.scrollTop = messagesDiv.scrollHeight;

    }

});




function disappearText() {

    disappear.classList.toggle("invisible");

}




forum.addEventListener("onclick", disappearText());
