import Header from './Sections/Header.js';
import Home from './Sections/Home.js';
import Checkout from './Sections/Checkout.js'
import Footer from './Sections/Footer.js'
import Login from './Sections/Login.js';
import Payment from './Sections/Payment.js';
import Orders from './Sections/Orders.js';

import {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';

import {auth} from './firebase-auth.js';
import useStateValue from './StateProvider.js';
 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './App.css'

const promise = loadStripe("pk_test_51J5EHJSEzMLO0wLKuoQkQvHZDW5XE5xwQiSXP61XSBMfzmHNvLDnf9iU0Ba68wuh6nAldPxtld3ORd1P07BDzDsq00ndvDCXLX")

function App() {

    const [ , dispatch] = useStateValue()

    useEffect( () => { 
        // will only run once when app loads
            auth.onAuthStateChanged(authUser => {
                // console.log('the user is >>>> ', authUser)

                dispatch({
                    type : 'SET_USER' ,
                    user : authUser  ? authUser : null
                })
            })
        },[dispatch])


    return (
        <Router>
            <div className='app'>

                <Routes>

                    <Route path='/'
                        element={
                            <Fragment><Header/><Home/><Footer/></Fragment>
                        }/>


                    <Route path='/checkout'
                        element={
                            <Fragment><Header/><Checkout/><Footer/></Fragment>
                        }/>


                    <Route exact path='/login'
                        element={<Login/>}/>

                    <Route exact path='/payment'
                        element={
                        <Fragment>
                            <Header/>
                            <Elements stripe = {promise}>
                            <Payment/>
                            </Elements>
                            <Footer/>
                            </Fragment>
                        }/>

                    <Route exact path='/orders'
                        element={
                        <Fragment>
                            <Header/>
                            <Orders/>
                            <Footer/>
                            </Fragment>
                        }/>

                </Routes>

            </div>
        </Router>

    )
}

export default App;


/*
<Router>: The router that keeps the UI in sync with the URL
<Link>: Renders a navigation link
<Route>: Renders a UI component depending on the URL











*/
