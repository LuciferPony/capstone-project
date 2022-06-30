import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import './sign-up-form.styles.scss';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName:'',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword }= formFields;
  const handlerChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert('Your passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        return console.error(error);
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span> Sign Up with your email and password</span>
      <form onSubmit={ (e) => {handlerSubmit(e);} }>
        <FormInput required
        label='Display Name'
        type='text'
        onChange={handlerChange}
        name='displayName'
        value={displayName} />

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

        <FormInput required
        label='Confirm Password'
        type='password'
        onChange={handlerChange}
        name='confirmPassword'
        value={confirmPassword}/>

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;