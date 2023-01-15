import { Button } from '@mui/material'
import {auth} from '../firebase';


const SignOut = () => {
  return (
    <div className='xzs' style={{
      display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', backgroundColor: '#202020', top: 0, borderBottom: 'solid 1px lightgray', zIndex: '10'}}>
      <Button style={{ padding: '20px', fontSize: '15px', borderRadius: '0', fontWeight: '600', }} onClick={() => auth.signOut()}>Sign out</Button>
    </div>
  )
}

export default SignOut