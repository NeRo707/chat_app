import { Button, Input } from '@mui/material'
import firebase from 'firebase';
import React, { useState } from 'react'
import { db, auth } from '../firebase';


interface IScroll {
  scroll: React.RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<IScroll> = ({scroll}) => {
  
  const [msg, setMsg] = useState('');
  const sendMessage = async (e:any) => {
    e.preventDefault();
    const {uid, photoURL}:any = auth.currentUser;

    await db.collection('messages').add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMsg('');

    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  } 
  return (
    <div>
      <form onSubmit={sendMessage}>
     
       <div className="sendMsg">
          <Input value={msg} onChange={(e) => setMsg(e.target.value)} style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' />
          <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type='submit' variant="outlined" >Send</Button>
       </div>

      </form>
    </div>
  )
}

export default SendMessage