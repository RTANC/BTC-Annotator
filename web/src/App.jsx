import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'

import './styles/App.css'

function App() {
  // api.defaults.headers.common['Authorization'] = "Bearer " + Cookies.get('token') //สำหรับกรณี user refresh หน้า page
  return (
    <div className="App">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App
