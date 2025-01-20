import './CityDetail.scss'

const CityDetail = ({ city }) => {
    if (!city || Object.keys(city).length === 0) {
        return <h1>No city data available</h1>
    }

    return (
        <div className="city-details">
            <h1>{city.name || 'City Name Unavailable'}</h1>
            <ul>
                <li>Population: {city.population || 'Unknown'}</li>
                <li>Continent: {city.location?.continent || 'Unknown'}</li>
                <li>Country: {city.location?.country || 'Unknown'}</li>
            </ul>
            {city.photo && <img src={city.photo} alt={city.name} />}
        </div>
    )
}

export default CityDetail