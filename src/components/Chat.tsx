import React, { useEffect, useState, useRef} from 'react'
import { auth, db } from '../firebase';
import { IChat } from '../Interface';
import SendMessage from './SendMessage';
import SignOut from './SignOut';
import classnames from 'classnames';
import brokima from '../assets/brokima.mp4'
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import firebase from 'firebase';


const Chat = () => {
  const [messages, setMessages] = useState<IChat[]>([]);

  const scroll = useRef<HTMLDivElement>(null);



  useEffect(() => {
    db.collection('messagesgit')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => {
          let message = doc.data() as IChat;
          message.createdAt = Date.now();
          return message;
        }));
    });
  }, []);
  
  useEffect(() => {
    
    db.collection('messagesgit')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(({id, data}) => ({...data, id} as IChat));
        setMessages(snapshot.docs.map(doc => doc.data() as IChat));
  
        scroll.current?.scrollIntoView({behavior:'smooth'});
         
        
    });
  }, []);

  const deleteMsg = async (createdAt: number) => {
    const timestamp = firebase.firestore.Timestamp.fromMillis(createdAt);
    try {
      await db.collection('messagesgit').doc(timestamp.toString()).delete();
      console.log("Document deleted successfully!")
  } catch (error) {
      console.error("Error deleting document: ", error);
  }
    setMessages(prevMessages => prevMessages.filter(m => m.createdAt !== createdAt));
}

 

  return (
    <>
  
      <SignOut />
      <video id="my-video" autoPlay loop muted>
        <source src={brokima} type="video/mp4" />
      </video>  
      <div>
        <h6>____dasda__</h6>
      </div>
      <div className='msgs'>
      <video id="my-video" autoPlay loop muted>
        
        <source src="../assets/brokima.mp4" type="video/mp4" />

      </video>
        {messages.map(( message: IChat) => (
          <div key={message.createdAt}>
              <div className={classnames('msg', { 'w-img': message.imageURL }, { 'sent': message.uid === auth.currentUser?.uid }, { 'received': message.uid !== auth.currentUser?.uid }, { 'w-img-received': message.imageURL && message.uid !== auth.currentUser?.uid })}>
                <img src={message.photoURL} alt="404.." />
                  <p>{message.text}</p>
      
                  <IconButton className='abobogaga'  aria-label="delete" onClick={() => deleteMsg(message.createdAt)}>
                      <Delete/>
                    </IconButton>
                 
                  {message?.imageURL && <img className='uimgs' src={message?.imageURL} alt="404.." />}
              </div>
          </div>
        ))}
        <>
          <SendMessage scroll={scroll} />
          <div style={{height: '80px'}} ref={scroll}>
            
          </div>
        </>
      </div>

    </>
  );
}

export default Chat;