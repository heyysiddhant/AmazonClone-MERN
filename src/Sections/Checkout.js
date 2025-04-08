import {Link} from 'react-router-dom'
import Subtotal from './Subtotal.js'
import './styles/Checkout.css'
import CheckOutProduct from './CheckOutProduct.js'

import useStateValue from '../StateProvider'

import { useState} from 'react';
import FlipMove from 'react-flip-move';


function Checkout() {
    const [
        {
            basket,
            user
        }, dispatch
    ] = useStateValue();

    const [ selected ,  ] = useState('')


    const removeAllFromBasket = () => {
        basket.map((item) => (dispatch({type: 'EMPTY_BASKET'})))
    }


function AllProducts(){
    return (

       
        <FlipMove>
        {
        basket?.map((item) => (

            <div className={ item.id === selected ? "item selected" : "item" }
                key={item.id}>

                <CheckOutProduct     
                product={item} 
                />

            </div>
        ))
    } 
            </FlipMove>
    )
}




    return (
        <div className='checkout'>

            <div className='checkout__leftside'>

                <Link to='/'>
                    <img className='checkout__ad' src='images/ad.jpg' alt='ad'/>
                </Link>

                <h3 style={
                    {color: 'blue'}
                }>Hello {user?.email}</h3>

                <h1 className='checkout__title'>Your Shoppig Basket
                </h1>

                {
                    (basket.length === 0) ?
                    <div style={{justifyContent:'center',alignItems:'center' , alignSelf:'center' , marginTop:20}}> 
                <p style={{fontSize:24 , fontWeight:'600' , textAlign:'center'}}>No Items in Your Cart List</p>
            </div>
                :
                
               <>

             <button className="checkout_subtitle"
                    onClick={removeAllFromBasket}>
                    <span style={{fontWeight:500 , fontSize:'14px'}}>
                    Deselect all items</span></button>
            

            <div className='checkout__items'>
            <AllProducts/>
            </div>


         
            <div className='checkout__rightside'>
                <Subtotal/>
            </div>
            </>
                }

</div>
        </div>
    )
}

export default Checkout
