import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../firebase-auth'
import './styles/Login.css'

function Login() {

    const [pwd, setPwd] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();


    function onLogin(e) {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, pwd).then(auth => { // if successfully created a new user with email and password
            alert('successfully logged in')

            if (auth) {
                navigate('/checkout');
            }
        }).catch(error => {alert(error.message ) ; console.log(error)})
    }

    function onCreateAccount(e) {

        auth.createUserWithEmailAndPassword(email, pwd).then(auth => { // if successfully created a new user with email and password
            alert('successfully created account')

            if (auth) {
                navigate('/');
            }
        }).catch(error => {alert(error.message ) ; console.log(error)})
    }


    return (
        <div className='login'>
            <Link to="/">
                <img className='login__logo' src='images/login_logo.png' alt='logo'/>
            </Link>

            <div className='login__container'>
                <h1>Sign In</h1>

                <form>
                    <h5>E-mail</h5>
                    <input value={email}
                        onChange=
                        {e => setEmail(e.target.value) }
                        type='text'/>

                    <h5>Password</h5>
                    <input value={pwd}
                        onChange=
                        {e => setPwd(e.target.value) }
                        type='password'/>

                    <p>
                        <input type='checkbox'/>
                        By sign in you agree the terms and conditions.</p>

                    <button type='submit'
                        onClick={onLogin}>Sign In</button>

                </form>

                <p>Account not created ?</p>

                <button 
                    onClick={onCreateAccount} className=''>Create your Amazon Account</button>

            </div>

        </div>
    )
}

export default Login
