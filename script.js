// script.js
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value;
    input.value = '';

    if (message) {
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML += `<div>User: ${message}</div>`;

        fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            chatbox.innerHTML += `<div>Bot: ${data.answer}</div>`;
        })
        .catch(error => console.error('Error:', error));
    }
}