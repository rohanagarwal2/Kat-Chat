const socket = io("http://localhost:8000")

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector('.container');



form.addEventListener('submit' , e => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value = '';

})




const append = (message , position) => {

    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const name = prompt("Enter your name to join chat");

socket.emit("new-user-joined" , name);

socket.on('user-joined' , name => {

    append(`${name} joined the chat` , 'center');


})

socket.on('recieve' , data => {

    append(`${data.user} : ${data.message} ` , 'left');

})

socket.on('left' , user => {
    append(`${user} left the chat` , 'center');
})