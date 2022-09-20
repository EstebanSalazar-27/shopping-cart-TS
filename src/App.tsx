import './App.css'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Route, Routes } from "react-router-dom"
import { FormUser } from './components/FormSignIn'
import UserProvider from './context/User'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
function App() {
  return (
    <UserProvider>
      <div className="App bg-stone-900 min-h-screen">
        <ShoppingCartProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth/user' element={<Auth />} />
          </Routes>
        </ShoppingCartProvider>
      </div>
    </UserProvider>
  )
}

export default App
