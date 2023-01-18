import React from 'react'
import { Button } from '@mui/material'
import firebase from 'firebase';

import { auth } from '../firebase';

const SignIn = () => {

  const signInWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider);

  };

  return (
    <div className='sigmabox'>
      <h1 style={{color:"white"}}>SUSICHAT</h1>
      <Button style={{color: "white",border:"1px solid white"}} variant="outlined" onClick={signInWithGoogle}>Sign In With Google</Button>
    </div>
  )
}

export default SignIn
