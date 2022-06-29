import { auth, signInWithGooglePopUp, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sing-up/sign-up-form.component';
import Button from '../../components/button/button.component';

const SignIn = () => {
  // useEffect(() => {
  //   getRedirectResult(auth).then( async (response) => {
  //     console.log(response);
  //     if(response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   })
  // }, [])

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button buttonType='google' onClick={() => logGoogleUser()}>Sign in with Google Popup</Button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;