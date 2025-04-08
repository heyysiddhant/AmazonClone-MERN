import {Star} from '@material-ui/icons'
import './styles/CheckOutProduct.css'

import useStateValue from '../StateProvider'


function CheckOutProduct({product , hideRemove}) {

    const [ , dispatch ] = useStateValue();

    function reomve_from_basket(){
        dispatch(
            {
                type:'REMOVE_FROM_BASKET' ,
                id : product.id ,
                price : product.price ,
            }
        );
    }


  return (
    <div className='checkoutProduct'>

    <img src={`images/${    product.imgUrl }`}
        alt={  `images/${product.imgUrl }`}
        className='checkoutProduct__image'/>
        
    <div className='checkoutProduct__info'>

        <p className='checkoutProduct__title'>
            {product.title }
        </p>

        <p className='checkoutProduct__price'>
            <span>Rs.</span>
            <span style={{fontWeight:'600'}}>{product.price}</span>
        </p>

        <p className='checkoutProduct__rating'>
            {Array(product.rating).fill().map((e, i) => <Star key={i}/>)} 
        </p>

{!hideRemove && <button className='product__remove_btn' onClick={reomve_from_basket}>
  
  <span style={{color:'black' , fontWeight:500 , fontSize:'14px' }}> Remove from basket </span>
  </button>
  }

    </div>

    

</div>
  )
}

export default CheckOutProduct