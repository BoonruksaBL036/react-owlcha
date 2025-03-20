import { useState } from 'react';
import './App.css'
import { getAllMenu } from './fetch/menu'
import { useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    console.log(getAllMenu());
    setMenu(getAllMenu())
  }, [])

  return (
    <div className='container'>
      <nav className='nav-bar'>
        <h1 className='owlcha-name'>Owl Cha สาขาราชภัฏนครปฐม</h1>
        <button className='btn-home'>
          <span>HOME</span>
        </button>
      </nav>
      <main className='main'>
        {menu.map((item) =>
          <div className={`box box-${item.id}`} key={item.id}>
            <img className='image-menu' src={`./src/assets/image/${item.imagePath}`} alt="" />
            <div className="description-container">
              <div className="description-box">
                <h2 className='description'>{item.description}</h2>
                <button className='btn-shop'>Read more</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
