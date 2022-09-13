
import './App.css'
import { Navbar } from './components/Navbar'
import { ListOfProducts } from './components/ListOfProducts'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {

  return (
    <div className="App bg-stone-900 min-h-screen">
      <ShoppingCartProvider>
        <Navbar />
        <ListOfProducts />
      </ShoppingCartProvider>
    </div>
  )
}

export default App
