import { useState, useEffect } from 'react'
import CitiesForm from '../components/Form/CitiesForm';
import CitiesList from '../components/CitiesList/CitiesList';

const CitiesPage = () => {

    const [cities, setCities] = useState([])
    const [cityToEdit, setCityToEdit] = useState(null)

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
      const { _id, ...cityData } = updatedCity
      
      try {
        const response = await fetch(`http://localhost:3000/cities/${updatedCity._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cityData),
        })

        if (!response.ok) {
          throw new Error('Failed to edit city');
        }

        const data = await response.json()
        
        setCities(prevState => prevState.map(city => city._id === data._id ? data : city))

        setCityToEdit(null)
      } catch (err) {
        console.error('Error editing city:', err);
      }
    }

    const startEditHandler = (city) => {
      setCityToEdit(city); // Set the city to be edited
    };
  
    // Cancel editing
    const cancelEditHandler = () => {
      setCityToEdit(null); // Clear the city being edited
    };
 
  return (
    <div>
        <CitiesForm 
          onNewCityHandler={newCityHandler} 
          onEditCityHandler={editCityHandler}
          cityToEdit={cityToEdit}
          onCancelEdit={cancelEditHandler}
        />
        <CitiesList 
          data={cities} 
          onDelete={deleteCityHandler}
          onEdit={startEditHandler}
        />
    </div>
  )
}

export default CitiesPage