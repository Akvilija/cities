import './CityItem.scss'

const CityItem = ({ data, onEdit, onDelete }) => {

    const { name, population, location} = data
    const { continent, country } = location
  return (
    <div className='city-item-container'>
        <ul>
            {name && <li>Name: {name}</li>}
            {population && <li>Population: {population}</li>}
            {continent && <li>Continent: {continent}</li>}
            {country && <li>Country: {country}</li>}
        </ul>
        <div>
          <button onClick={() => onEdit(data)}>
            Edit
          </button>
          <button onClick={() => onDelete(data._id)}>
            Delete
          </button>
        </div>
    </div>
  )
}

export default CityItem