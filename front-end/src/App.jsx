import './App.css'
import { Routes, Route } from 'react-router-dom'
import CitiesPage from './pages/CitiesPage'
import Header from './components/Header/Header'
import CityPage from './pages/CityPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<h1>This is cities home page!</h1>} />
        <Route path='/cities' element={<CitiesPage />} />
        <Route path='/cities/:id' element={<CityPage />} />
      </Routes> 
    </>
  )
}

export default App
