import React, {useState, useContext} from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'
import AppContext from '../../context';

function Card({ id, parentId, imageUrl, title, price, onFavorite, onPlus, favorited = false, loading = false }) {
  const { isItemAdded } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  
  const obj = { id, parentId: id, imageUrl, title, price }

  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickFavorite = () => {
    onFavorite(obj)
    setIsFavorite(prev => prev = !prev)
  }

    return (
      <div className={styles.card}>
        {
          loading ? <ContentLoader 
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="100" rx="5" ry="5" width="150" height="15" /> 
          <rect x="0" y="119" rx="5" ry="5" width="93" height="15" /> 
          <rect x="0" y="148" rx="5" ry="5" width="80" height="24" /> 
          <rect x="117" y="141" rx="5" ry="5" width="32" height="32" />
          </ContentLoader> :
            <>
            {onFavorite && <div onClick={onClickFavorite} className={styles.favorite}>
              <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
            </div>}
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title }</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />}
            </div>
            </>
        }
            
        </div>
    );
}

export default Card;