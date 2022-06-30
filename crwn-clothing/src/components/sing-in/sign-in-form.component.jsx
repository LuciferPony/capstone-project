import { useState, useContext } from 'react';
import './sign-in-form.styles.scss';
import { signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password }= formFields;
  const handlerChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value });
  };

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopUp();
    await createUserDocumentFromAuth(user);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
    } catch(error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert ('Incorrect password');
          break;
        case 'auth/user-not-found':
          alert ("Incorrect email");
          break;
        default:
          console.error(error.message);
      }
    }
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span> Sign In with your email and password</span>
      <form onSubmit={ (e) => {handlerSubmit(e);} }>
        <FormInput required
        label='Email'
        type='email'
        onChange={handlerChange}
        name='email'
        value={email}/>

        <FormInput required
        label='Password'
        type='password'
        onChange={handlerChange}
        name='password'
        value={password}/>

        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={() => {signInWithGoogle();}}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;