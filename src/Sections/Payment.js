import useStateValue from '../StateProvider'
import CheckOutProduct from './CheckOutProduct';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useEffect, useState} from 'react';
import CurrencyFormat from 'react-currency-format';

import axios from '../axios-api'
import {useNavigate} from 'react-router-dom'
import './styles/Payment.css' 
import { db } from '../firebase-auth'

function Payment() {

    const nav = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState(false)
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(null)


    let [
        {
            basket,
            total,
            user
        },
        
    ] = useStateValue();


    const [  , dispatch] = useStateValue();


    // handle payment on submit
    const handlePayment = async (e) => {

        e.preventDefault();

        const cardElement = elements.getElement(CardElement);

        setProcessing(true);

        //payment payload
       await stripe.confirmCardPayment(clientSecret,
            {
            payment_method: {
                card: cardElement,
                billing_details: {
                  name: 'vikash verma',
                  email : user?.email,
                },
              },
        }
        )
        .then(({paymentIntent}) => { // payment confirmation

            if(paymentIntent){
                    console.log('payment confirmation')

                    setSucceeded(true);
                    setError(null)

                
                    db
                    .collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .add({
                        id : paymentIntent.id ,
                        basket:basket ,
                        amount : paymentIntent.amount,
                        created :paymentIntent.created
                    })
                    .then(doc=>{
                        console.log('Successfully added with id : ' , doc.id)
                    })
                    .catch(err=>{
                        console.log(err)
                    })

                    dispatch({
                        type : 'EMPTY_BASKET'
                    })
                    alert(`payment status ${paymentIntent.status}`)
                    nav('/orders')
                }
                else{
                    alert('payment not confirmed')
                    setProcessing(false);
                    setError('card details are not valid')
                }
        })
        .catch((e) => {
            console.log('payment failed due to reason' , e)
            alert('payment failed due to reason')
            setProcessing(false);
            setError('payment failed')
        })
    }
   

    // handle card changes and display error if customer types wrong details
    const handleChange = (e) => {
        setDisabled(!e.complete)
        setError(e.error ? e.error.message : "");      
    }


    // generate the special stripe secret which allow us to charge a customer
    useEffect(() => {
        const getClientSecret = async () => {

            const response = await axios({method: 'post', url: `/payment/create/?total=${parseInt(total)}`})

            setClientSecret(response.data.clientSecret);
            // console.log("clientSecret is ", clientSecret)

        };
        getClientSecret();

    }, [  total])


    return (
        <div className='payment'>

            <h1>Checkout ({
                basket?.length
            }
                items)</h1>

            <div className='payment__section'>
                <h3>Delivery Address</h3>

                <div className='payment__address'>
                    <p>HN-29 Sector A Indrapuri</p>
                    <p>Bhopal , Madhya Pradesh</p>
                    <p>462022</p>
                </div>
            </div>

            <div className='payment__section payment__items_container'>
                <h3>Review items and Delivery</h3>

                <div className='payment__items'>
                    {
                    basket?.map(item => (
                        <CheckOutProduct product={item}
                            key={
                                item.id
                            }/>
                    ))
                } </div>

            </div>

{
/* useStripe() is a hook that allows a functional component to access the Stripe object.
useElements() is a hook that allows the developer to access the mounted Elements. */}

            <div className='payment__section payment_method'>
                <h3>Payment method</h3>
                <div className='payment__details'>
                    
                    <form onSubmit={handlePayment}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment__price_container'>

                            <CurrencyFormat renderText={
                                    value => (
                                        <p>
                                            Order Total :
                                            <strong> {value} </strong>
                                        </p>
                                    )
                                }
                                decimalScale={2}
                                value={total}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={"₹"}
                                suffix={"/-"}/>

                            <button  disabled={
                                processing || disabled || succeeded
                            } style= {{ backgroundColor : processing ?  'gray' : 'lightblue' }}>
                                <span style={{fontWeight:'500' , color:'#000',fontSize:20}}> {
                                    processing ? "Processing" : "Buy Now"
                                }</span>
                            </button>
                        </div>

                        {/*if error of card payment details */}
                        <div className='payment__errors'>
                            {error && <p> {error} </p> } 
                        </div>

                    </form>
                </div>


            </div>

        </div>

    )
}

export default Payment


 /* 
 amount: 6979
amount_details: {tip: {…}}
automatic_payment_methods: null
canceled_at: null
cancellation_reason: null
capture_method: "automatic"
client_secret: "pi_3MGexjSEzMLO0wLK0I7RFLlk_secret_MHJDVaRpfggcqTANHk0a2VqLH"
confirmation_method: "automatic"
created: 1671439483
currency: "inr"
description: null
id: "pi_3MGexjSEzMLO0wLK0I7RFLlk"
last_payment_error: null
livemode: false
next_action
: 
null
object
: 
"payment_intent"
payment_method
: 
"pm_1MGeyLSEzMLO0wLKkem4FXT0"
payment_method_types
: 
['card']
processing
: 
null
receipt_email
: 
null
setup_future_usage
: 
null
shipping
: 
null
source
: 
null
status
: 
"succeeded"
 
 */