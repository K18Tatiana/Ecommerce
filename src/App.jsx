import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import NavBar from './components/NavBar'
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import Signup from './pages/Signup'

function App() {

  const isLoading = useSelector( state => state.isLoading )

  return (
    <HashRouter>
      <NavBar />
      { isLoading && <Loader /> }
      <Container className='my-5'>
        <Routes>
        
          <Route path='/' element={ <Home /> } />
          <Route path='/product/:id' element={ <ProductDetail /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          
          <Route element={ <ProtectedRoutes /> }>
            <Route path='/purchases' element={ <Purchases /> } />
          </Route>

        </Routes>
      </Container>

    </HashRouter>
  )
}

export default App
