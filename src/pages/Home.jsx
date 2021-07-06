import React, { useContext } from 'react';
import Card from '../components/Card';

function Home({searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite, items, isLoading}) {

  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
    <Card
      key={index}
      onFavorite={(obj) => onAddToFavorite(obj)}
      onPlus={(obj) => onAddToCart(obj)}
      {...item}
      loading={isLoading}
    />
  ))
}
  
  return (
        <div className="content p-40">
        <div className="d-flex align-center mb-30 justify-between">
          <h1>{ searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки' }</h1>
          <div className="search-block d-flex">
            {searchValue &&
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />}
            <img src="/img/search.svg" alt="Search"/>
            <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    )
}

export default Home