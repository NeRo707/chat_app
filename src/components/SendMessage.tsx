import { Button, Input } from '@mui/material'
import firebase from 'firebase';
import React, { useRef, useState } from 'react'
import { db, auth, imagesRef } from '../firebase';
import { IUser } from '../Interface';


interface IScroll {
  scroll: React.RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<IScroll> = ({scroll}) => {
  
  const [msg, setMsg] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  
  const sendMessage = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser as IUser;
    
    const file = fileInput.current?.files?.[0];
    
    if(file && msg !== '' || file && msg == ''){
      const fileRef = imagesRef.child(file.name);
      const uploadTask = fileRef.put(file);

      uploadTask?.on('state_changed', snapshot => {
        // Handle progress, success and error events
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, error => {
        // Handle error
        console.log(error);
    }, async () => {
        // Handle success
        // Get the download URL of the file
        const url = await fileRef.getDownloadURL();
        console.log(url);
        if(fileInput.current){
          fileInput.current.value = '';
        }
        // Add the image URL to the message object
        await db.collection('messagesgit').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            imageURL: url
        });
    });
  
    }else if(msg !== ''){
      await db.collection('messagesgit').add({
        text: msg,
        photoURL,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    }

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
          <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 2% -13px 1%', maxWidth: '200px'}} type='submit' variant="outlined" >Send</Button>
          <Button className='slz' style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 3% -13px 1%', maxWidth: '200px'}} variant="contained" component="label">
                Upload
                <input className='uploadz' hidden accept="image/*" multiple ref={fileInput} type="file" />
              </Button>
       </div>

      </form>
    </div>
  )
}

export default SendMessage