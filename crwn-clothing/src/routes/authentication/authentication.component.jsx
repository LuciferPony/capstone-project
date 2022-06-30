import SignUpForm from '../../components/sing-up/sign-up-form.component';
import SignInForm from '../../components/sing-in/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />

    </div>
  )
}

export default Authentication;