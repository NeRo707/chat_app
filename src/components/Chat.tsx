import React, { useEffect, useState, useRef} from 'react'
import { auth, db } from '../firebase';
import { IChat } from '../Interface';
import SendMessage from './SendMessage';
import SignOut from './SignOut';
import classnames from 'classnames';
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
  
        scroll.current?.scrollIntoView({behavior:'smooth'});
         
        
    });
  }, []);

  
 

  return (
    <>
      <SignOut />
      <div className='msgs'>
        {messages.map(( message: IChat) => (
          <div key={message.createdAt}>
              <div className={classnames('msg', { 'w-img': message.imageURL }, { 'sent': message.uid === auth.currentUser?.uid }, { 'received': message.uid !== auth.currentUser?.uid }, { 'w-img-received': message.imageURL && message.uid !== auth.currentUser?.uid })}>
                  <img src={message.photoURL} alt="404.." />
                  <p>{message.text}</p>
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