// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username){
      this.room = room;
      this.username = username;
      this.chat = db.collection('chat');
      this.unsub;
    }
    
    async addChat(message){
      // format a chat object
      const now = new Date();
      const chat_new = {
       message: message,
      // message, // Es6 feature if object name is equal to the value 
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
      };
      // save the chat document
      const response = await this.chat.add(chat_new);
      return response;
    }
     getChats(callback){
       this.unsub= this.chat
        .where('room' , '==' ,this.room)
         .orderBy('created_at')
          .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach( change =>{
                
                if(change.type==='added'){
                    callback(change.doc.data());
                }
                //else if(change.type==='removed')
            });
          });
    }
    updateName(username){
        this.username=username;
        localStorage.username = username;
    }
    updateRoom(room){
        this.room= room;
        localStorage.roomName = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }
  }
  
  
  //chatroom.updateName('priya');
//   chatroom.addChat('hello everyone')
//     .then(() => console.log('chat added'))
//     .catch(err => console.log(err));
    
    // chatroom.getChats((data)=>{
    //    console.log(data)
    // });
    
    
    // setTimeout(()=>{
    //     chatroom.updateRoom('gaming');
    //     chatroom.updateName('yoshima');
    //     chatroom.getChats((data)=>{
    //         console.log(data.username,data.room);
    //      });
    //      chatroom.addChat('hello homie');
    // },3000);
    