import React, { useEffect, useState, useContext } from 'react'
import Card from '../components/Card';
import axios from 'axios'
import AppContext from '../context'

function Orders() {
  const [orders, setOrders] = useState([])
  const { onAddToFavorite, onAddToCart } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://60d98dcaeec56d00174778af.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert('Не удалось загрузить покупки')
        console.error(error)
      }
    })()
  }, [])
    return (
        <div className="content p-40">
          <div className="d-flex align-center mb-30 justify-between">
            <h1>Мои заказы</h1>
          </div>
          <div className="d-flex flex-wrap">
          {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                  <Card
                  key={index}
                  loading={isLoading}
                  {...item}
            />
              ))
            }
          </div>
      </div>
    )
}

export default Orders