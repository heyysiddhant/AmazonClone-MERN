import React from 'react'
import moment from 'moment/moment'
import './styles/Order.css'
import CheckOutProduct from './CheckOutProduct'
import CurrencyFormat from 'react-currency-format'

function Order({id, items, createdOn, amount}) {
    return (
        <div className='order'>

            <div className='order__info'>

                <h2 >Order </h2>
                <p className='order__date'>
                 {moment.unix(createdOn).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>

                <p className='order__id'>
                Order ID :<small> <b>{id}</b></small>
                </p>
            </div>


                <div className='order__amount'>

                <CurrencyFormat renderText={
                        value => <>
                            <p>
                                Total Amount :
                                <strong> {value} </strong>
                            </p>
                        </> }
                    decimalScale={2}
                    value={amount}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={"Rs "}
                    suffix={"/-"}/>

                </div>

            <div className='order__items'>
                {
                items.map(item => (

                    <CheckOutProduct key={item.id}  product={item} hideRemove = {true}/>
                ))
            }
             </div>

            
    </div>
    )
}

export default Order
