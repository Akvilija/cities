import './App.css'
import { Routes, Route } from 'react-router-dom'
import CitiesPage from './pages/CitiesPage'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<h1>This is cities home page!</h1>} />
        <Route path='/cities' element={<CitiesPage />} />
      </Routes> 
    </>
  )
}

export default App
