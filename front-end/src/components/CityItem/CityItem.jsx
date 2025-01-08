const CityItem = ({ data }) => {

    const { name, population, location} = data
    const { continent, country } = location
  return (
    <div>
        <ul>
            {name && <li>Name: {name}</li>}
            {population && <li>Population: {population}</li>}
            {continent && <li>Continent: {continent}</li>}
            {country && <li>Country: {country}</li>}
        </ul>
    </div>
  )
}

export default CityItem