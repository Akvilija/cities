import './CityItem.scss'
import cityLogo from '../../images/city-logo.png'

const CityItem = ({ data, onDelete }) => {

    const { name, population, location } = data
    const { continent, country } = location
  return (
    <div className='city-item-container'>
      <div className='city-info-and-logo'>
        <ul>
          {name && <li>Name: {name}</li>}
          {population && <li>Population: {population}</li>}
          {continent && <li>Continent: {continent}</li>}
          {country && <li>Country: {country}</li>}
        </ul>
        <div className='logo-container'>
          <img alt='city-logo' src={cityLogo} />
        </div>
      </div>
      <div>
        <button onClick={() => onDelete(data._id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default CityItem