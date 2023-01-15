import React, { useEffect, useState, useRef, createRef, RefObject } from 'react'
import { auth, db } from '../firebase';
import { IChat } from '../Interface';
import SendMessage from './SendMessage';
import SignOut from './SignOut';

const Chat = () => {
  const [messages, setMessages] = useState<IChat[]>([]);

  const scroll = useRef<HTMLDivElement>(null);



  useEffect(() => {
    db.collection('messages')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => {
          let message = doc.data() as IChat;
          message.createdAt = Date.now();
          return message;
        }));
    });
  }, []);
  
  useEffect(() => {
    db.collection('messages')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(({id, data}) => ({...data, id} as IChat));
        setMessages(snapshot.docs.map(doc => doc.data() as IChat));
    });
  }, []);
  
  return (
    <>
      <SignOut />
      <div className='msgs'>
        {messages.map(( message: IChat) => (
          <div key={message.createdAt}>
              <div  className={`msg ${message.uid === auth.currentUser?.uid ? 'sent' : 'received'}`}>
                  <img src={message.photoURL} alt="404.." />
                  <p>{message.text}</p>
              </div>
          </div>
        ))}
        <>
          <SendMessage scroll={scroll} />
          <div ref={scroll}>
            
          </div>
        </>
      </div>
    </>
  );
}

export default Chat;