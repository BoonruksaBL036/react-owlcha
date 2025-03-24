import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import Shop from './page/shop.jsx'

const images = import.meta.glob('/src/assets/image/**/*.{png,jpg,jpeg,webp}', { eager: true })
console.log(images);
const router = createBrowserRouter([
  { path: '/', element: <App images={images} /> },
  { path: '/shop/:keyword/:id', element: <Shop images={images} /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
