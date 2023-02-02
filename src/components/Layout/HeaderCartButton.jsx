import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    const [btnIsHightlighted, setBtnIsHightlighted] = useState(false)
    const {items} = cartCtx

    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.totalAmount
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHightlighted ? classes.bump : ''}`
    useEffect(() => {
        if(items.length === 0){
            return
        }
        setBtnIsHightlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHightlighted(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton