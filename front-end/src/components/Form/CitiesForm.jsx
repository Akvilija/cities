import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import './CitiesForm.scss'

const CitiesForm = ({ onNewCityHandler, onEditCityHandler, cityToEdit, onCancelEdit }) => {

    const [name, setName] = useState('')
    const [population, setPopulation] = useState('')
    const [continent, setContinent] = useState('')
    const [country, setCountry] = useState('')
    const [photo, setPhoto] = useState('')

    useEffect(() => {
        if (cityToEdit) {
            setName(cityToEdit.name)
            setPopulation(cityToEdit.population)
            setContinent(cityToEdit.location?.continent || '')
            setCountry(cityToEdit.location?.country || '')
            setPhoto(cityToEdit.photo)
        } else {
            setName('')
            setPopulation('')
            setContinent('')
            setCountry('')
            setPhoto('')
        }
    }, [cityToEdit])

    const nameHandler = event => setName(event.target.value)
    const populationHandler = event => setPopulation(Number(event.target.value))
    const continentHandler = event => setContinent(event.target.value)
    const countryHandler = event => setCountry(event.target.value)
    const photoHandler = event => setPhoto(event.target.value)

    const newCityHandler = event => {
        event.preventDefault()

        if (!name || !population || !continent || !country || !photo) {
            alert("All fields are required!")
            return
        }
    
        if (isNaN(population) || Number(population) <= 0) {
            alert("Population must be a positive number!")
            return
        }

        const cityData = {
            name,
            population,
            location: {
                continent,
                country
            },
            photo,
        }

        if (cityToEdit) {
            fetch(`${API_URL}/cities/${cityToEdit._id}`, {
                method: 'PUT',
                body: JSON.stringify(cityData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(updatedCity => {
                    onEditCityHandler(updatedCity);
                })
                .catch(error => {
                    console.log(`Error updating city: ${error.message}`)
                });
        } else {
            fetch(`${API_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(cityData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then(createdCity => {
                    onNewCityHandler(createdCity)
                })
                .catch(error => {
                    alert(`Error: ${error.message}`);
                })
        }

        setName('')
        setPopulation('')
        setContinent('')
        setCountry('')
        setPhoto('')
    }

  return (
    <div>
        <form onSubmit={newCityHandler}>
            <div className='form-control'>
                <label htmlFor='name'>City Name:</label>
                <input 
                    type='text'
                    id='name'
                    value={name}
                    onChange={nameHandler}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='population'>Population:</label>
                <input 
                    type='number'
                    id='population'
                    value={population}
                    onChange={populationHandler}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="continent">Continent:</label>
                <input 
                    type="text" 
                    id='continent'
                    value={continent}
                    onChange={continentHandler}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="country">Country:</label>
                <input 
                    type="text" 
                    id='country'
                    value={country}
                    onChange={countryHandler}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="photo">Photo URL:</label>
                <input 
                    type="text" 
                    id='photo'
                    value={photo}
                    onChange={photoHandler}
                />
            </div>

            <button type='submit'>{cityToEdit? 'Update City' : 'Add City'}</button>
            {cityToEdit && <button type='button' onClick={onCancelEdit}>Cancel</button>}
        </form>
    </div>
  )
}

export default CitiesForm