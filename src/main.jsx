import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Register, Home, About, Contact, NotFound, Layout, AllProducts, Product, Cart, Success, Cancel, Test } from "./components/index.js"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AuthProvider } from './contexts/authContext/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                  <Route path='/' element={<Home />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path='/products' element={<AllProducts />}/>
                  <Route path='/product/:slug' element={<Product />}/>
                  <Route path='/about' element={<About />}/>
                  <Route path='/contact' element={<Contact />}/>
                  <Route path='/cart' element={<Cart />}/>
                  <Route path='/success' element={<Success />}/>
                  <Route path='/cancel' element={<Cancel />}/>
                  <Route path='/test' element={<Test />}/>
                  <Route path='*' element={<NotFound />}/>
              </Route>
            </Routes>
          </AuthProvider>
        </Provider>
    </BrowserRouter>
  </StrictMode>,
)
