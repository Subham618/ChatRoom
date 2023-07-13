const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');


// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
        chatroom.updateName(newName);
    
        newNameForm.reset();
    updateMsg.innerHTML=`your username is Updated to ${newName}`;
    setTimeout(() => updateMsg.innerHTML='' ,3000);

});

rooms.addEventListener('click', e =>{
   // e.preventDefault();
   if(e.target.tagName==="BUTTON"){
    chatUI.clear();
    const room_value= e.target.getAttribute('id');
    chatroom.updateRoom(room_value);
    //console.log(`you are currently in ${room_value}`);
    chatroom.getChats(chat => chatUI.render(chat));
   }
});


// if local sotrage contains username or not 
const username = localStorage.username ? localStorage.username : 'anon';
const roomName = localStorage.roomName ? localStorage.roomName: 'general';
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(roomName, username);
//console.log(`you are currently in ${roomName}`);
// get chats & render
chatroom.getChats(data => chatUI.render(data));