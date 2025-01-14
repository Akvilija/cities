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

    const deleteCityHandler = async cityId => {
      try {
        await fetch(`http://localhost:3000/cities/${cityId}`, {
          method: 'DELETE',
        })

        setCities(prevState => prevState.filter(city => city._id !== cityId))
      } catch (err) {
        console.error('Error deleting city:', err)
      }
    }

    const editCityHandler = async updatedCity => {
      try {
        const response = await fetch(`http://localhost:3000/cities/${updatedCity.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCity),
        })

        if (!response.ok) {
          throw new Error('Failed to edit city');
        }

        const data = await response.json()

        setCities(prevState => prevState.map(city => console.log(city.id)))
      } catch (err) {
      console.error('Error editing city:', err);
      }
    }
 
  return (
    <div>
        <CitiesForm onNewCityHandler={newCityHandler} />
        <CitiesList 
          data={cities} 
          onDelete={deleteCityHandler}
          onEdit={editCityHandler}
        />
    </div>
  )
}

export default CitiesPage