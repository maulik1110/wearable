// import main crouel
import MainCarousel from './MainCarousel'

import React from 'react'
import ShoppingList from './ShoppingList'

const Home = () => {
  return (
    <div className='home'>
      <MainCarousel/>
      <ShoppingList/>
    </div>
  )
}

export default Home