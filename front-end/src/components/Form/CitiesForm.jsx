import { useState } from 'react'
import { API_URL } from '../../config'
import './CitiesForm.scss'

const CitiesForm = ({ onNewCityHandler }) => {

    const [name, setName] = useState('')

    const nameHandler = event => setName(event.target.value)

    const newCityHandler = event => {
        event.preventDefault()

        const newCity = {
            name
        }

        fetch(`${API_URL}/cities`, {
            method: 'POST',
            body: JSON.stringify(newCity),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(createdCity => {
                onNewCityHandler(createdCity)

                setName('')
            })
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

            <button type='submit'>Add City</button>
        </form>
    </div>
  )
}

export default CitiesForm