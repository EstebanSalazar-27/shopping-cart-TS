import './App.css'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Route, Routes } from "react-router-dom"
import { FormUser } from './components/FormUser'
import UserProvider from './context/User'
import { Home } from './pages/Home'
function App() {
  return (
    <UserProvider>
      <div className="App bg-stone-900 min-h-screen">
        <ShoppingCartProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/user' element={<FormUser />} />
          </Routes>
        </ShoppingCartProvider>
      </div>
    </UserProvider>
  )
}

export default App
