import { useState, useEffect } from 'react'
import CitiesForm from '../components/Form/CitiesForm';
import CitiesList from '../components/CitiesList/CitiesList';

const CitiesPage = () => {

    const [cities, setCities] = useState([]);

    useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await fetch('http://localhost:3000/cities')
  
          if (!response.ok) {
            throw new Error('Failed to fetch cities')
          }
  
          const data = await response.json()
          setCities(data)
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }

      fetchCities()
      
    }, [])

    const newCityHandler = newCity => {
        setCities(prevState => [newCity, ...prevState])
    }

  return (
    <div>
        <CitiesForm onNewCityHandler={newCityHandler} />
        <CitiesList data={cities} />
    </div>
  )
}

export default CitiesPage