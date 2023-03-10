import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CarItem'
import classes from './Cart.module.css'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const hasItems = cartCtx.items.length > 0
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    
    const cartItemRemoveHandler= (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler= (item) => {
        cartCtx.addItem({...item, amount: 1})
    }
 
    const cartItem = (
        <ul className={classes['cart-item']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={() => cartItemAddHandler(item)}
                />
            ))}
        </ul>
    )
    return <Modal onCloseCart={props.onCloseCart}>
        {cartItem}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart