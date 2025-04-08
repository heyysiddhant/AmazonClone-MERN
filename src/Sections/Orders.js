import {useEffect, useState} from 'react'
import {db} from '../firebase-auth';
import useStateValue from '../StateProvider'
import './styles/Orders.css'
import Order from './Order';

function Orders() {
    const [
        {
            user
        }, 
    ] = useStateValue();

    const [orders, setOrders] = useState([])

    useEffect(() => {

        if (user) {
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .orderBy('created')
              .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
                  })
        } 
        else {
            setOrders([]);
        }
      }, [user , orders])


    return (
        <div className='orders'>


            {
              orders.length !== 0 ? 

              orders.map(order => (
              <div className='orders__order'>
              <Order id={order.id} items = {order.data.basket} createdOn={order.data.created} amount = {order.data.amount} />
              </div>
            ))
            :
            <div style={{justifyContent:'center',alignItems:'center' , alignSelf:'center' , marginTop:20}}> 
                <p style={{fontSize:24 , fontWeight:'600' , textAlign:'center'}}>No Orders created</p>
            </div>
            }

        </div>
    )
}

export default Orders
