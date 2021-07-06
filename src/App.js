import React, { useEffect, useState } from 'react';
import {Route} from 'react-router-dom'
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import axios from 'axios';
import AppContext from './context'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse, favoriteResponse] = await Promise.all([
          axios.get('https://60d98dcaeec56d00174778af.mockapi.io/cart'),
          axios.get('https://60d98dcaeec56d00174778af.mockapi.io/items'),
          axios.get('https://60d98dcaeec56d00174778af.mockapi.io/favorites')
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoriteResponse.data)
        setItems(itemsResponse.data)

      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://60d98dcaeec56d00174778af.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post('https://60d98dcaeec56d00174778af.mockapi.io/cart', obj)
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      console.log("id " + id)
      axios.delete(`https://60d98dcaeec56d00174778af.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://60d98dcaeec56d00174778af.mockapi.io/favorites/${obj.id}`)
      } else {
        const { data } = await axios.post('https://60d98dcaeec56d00174778af.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch(error) {
      alert('Не удалось добавить в закладки')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
  }

  const isItemAdded = id => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
      <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={ cartOpened }/>
      <Header onClickCart={() => setCartOpened(true)} />
      <Route exact path="/">
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          onChangeSearchInput={onChangeSearchInput}
          isLoading={isLoading}
        />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Route path="/orders">
        <Orders />    
      </Route>
    </div>
  </AppContext.Provider>
  );
}

export default App;

// Таймкод: #7, 2:48:24