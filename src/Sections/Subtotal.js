import CurrencyFormat from 'react-currency-format'
import useStateValue from '../StateProvider'

import './styles/Subtotal.css'
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  

  const [{basket , total} , ] = useStateValue();
  const nav = useNavigate();


  // function getBaketTotal() {
  //   return  basket.reduce( (amount,item) => item.price + amount , 0)
  // }

  return (
    <div className='subtotal' style={{display: basket.length>0 ? "block" : 'none'}}>
  

      <CurrencyFormat
      renderText={value => 
        <>
        <p>
          Subtotal ({basket.length} items) : <strong> {value} </strong>
        </p>
    
        <small className='subtotal__gift'>
          <input type='checkbox'/> This order contains a gift
          </small>
        </>
      }
      decimalScale={2}
      // value = {getBaketTotal()}
      value = {total}
      displayType={'text'}
      thousandSeparator={true}
      prefix = {"₹"}
      suffix = {"/-"}
          />
      
      <button  onClick = { () => nav('/payment') }><span style={{color:'black' , fontWeight:500 , fontSize:'14px' }}> Proceed to Checkout</span></button>
      
      </div>

  )
}

export default Subtotal