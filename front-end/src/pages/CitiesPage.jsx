import { useState } from 'react'
import CitiesForm from '../components/Form/CitiesForm';
import CitiesList from '../components/CitiesList/CitiesList';

const CitiesPage = () => {

    const [cities, setCities] = useState('');

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