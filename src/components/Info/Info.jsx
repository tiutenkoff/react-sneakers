import React, { useContext } from 'react'
import AppContext from '../../context'
import styles from './Info.module.scss'

function Info({ title, image, description }) {
    const { setCartOpened } = useContext(AppContext)
    return (
        <div className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}>
            <img className="mb-20" width={120} src={ image } alt="Empty cart" />
            <h2>{ title }</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
                <img src="/img/arrow.svg" alt="Arrow" />Вернуться назад
            </button>
        </div>
    )
}

export default Info
