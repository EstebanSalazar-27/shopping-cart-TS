
import './App.css'
import { Navbar } from './components/Navbar'
import { ListOfProducts } from './components/ListOfProducts'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {

  return (
    <div className="App">
      <ShoppingCartProvider>
        <Navbar />
        <ListOfProducts />
      </ShoppingCartProvider>
    </div>
  )
}

export default App
