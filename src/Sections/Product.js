import { Star } from '@material-ui/icons'
import useStateValue from '../StateProvider'

import './styles/Product.css'
import { useEffect, useState } from 'react';

function Product({id , title , price , rating ,  imgUrl}) {

  const [  , dispatch] = useStateValue();
  const [isAdded , setIsAdded] = useState(false)


  function add_to_basket(){
    //dispatch the item into the data layer
    if(!isAdded)
    dispatch({
      type:'ADD_TO_BASKET' ,
      item:{
        id,
        title,
        price ,
        rating,
        imgUrl,
      }
    })
    else 
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id,
      price
    })

    setIsAdded(!isAdded)
  }

 
  
  return (
    <div className='product'>

        <div className='product__info'>
            <p className='product__title'>{title}</p>

            <p className='product__price'>
                <span>Rs. </span>
                <span>{price}</span>
            </p>

            <p className='product__rating'>
              {
                Array(rating).fill().map( (e , i) => <Star key = {i}/> )
                          }          
              </p> 
        </div>

        <img src={`images/${imgUrl}`}  alt={`images/${imgUrl}`} className='product__image'/>

        <button className='product__add_btn' onClick={add_to_basket} 
        style={{backgroundColor: isAdded ? 'red' : 'lightblue'}}
        > <p className='product__add_text' style={{fontWeight:'500' , fontSize:15}}> {isAdded ? 'Remove from basket' :  'Add to basket'}</p></button>
    </div>
  )
}

export default Product