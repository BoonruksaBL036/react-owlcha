import { useState } from 'react';
import './App.css'
import { getAllMenu } from './fetch/menu'
import { useEffect } from 'react';
import Navbar from './assets/component/navbar';
import { Link } from 'react-router-dom';

function App(props) {
  const { images } = props
  const [menu, setMenu] = useState([])
  useEffect(() => {
    console.log(getAllMenu());
    setMenu(getAllMenu())
  }, [])

  return (
    <div className='container'>
      <Navbar />
      <main className='main'>
        {menu.map((item) =>
          <div className={`box box-${item.id}`} key={item.id}>
            <img className='image-menu' src={images[`/src/assets/image/${item.imagePath}`]?.default} alt="" />
            <div className="description-container">
              <div className="description-box">
                <h2 className='description'>{item.description}</h2>
                <Link to={`/shop/${item.keyword}/${item.id}`} className='btn-shop'>Read more</Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App