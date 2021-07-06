import React, {useContext, useState} from 'react';
import styles from './Drawer.module.scss'
import Info from '../Info/Info'
import axios from 'axios'
import {useCart} from '../../hooks/useCart'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { cartItems, setCartItems, totalPrice } = useCart()

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://60d98dcaeec56d00174778af.mockapi.io/orders', {
                items: cartItems
            })
            setOrderId(data.id)
            setIsOrderComplete(true)
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://60d98dcaeec56d00174778af.mockapi.io/cart/' + item.id)
                await delay(1000)
            }
            setCartItems([])
        } catch (error) {
            alert('Ошибка при создании заказа')
        }
         setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина
                    <img onClick={onClose} className={`${styles.removeBtn} cu-p`} src="img/btn-remove.svg" alt="Close" />
                </h2>
                {
                    items.length ?
                    (<div className="d-flex flex-column flex">
                        <div className={styles.items}>
                            {
                                items.map(obj => (
                                    <div key={obj.id} className={`${styles.cartItem} d-flex align-center mb-20`}>
                                        <div
                                            style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                            className={styles.cartItemImg}></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            onClick={() => onRemove(obj.id)}
                                            className={styles.removeBtn}
                                            src="img/btn-remove.svg"
                                            alt="Remove" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} руб. </b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                onClick={onClickOrder}
                                className={styles.greenButton}>Оформить заказ
                                <img src="img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>) : (<Info
                                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке.` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                                image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
                            />)
                }    
            </div>
        </div>
        
    );
}

export default Drawer;