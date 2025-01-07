import React from 'react'
import CityItem from '../CityItem/CityItem';

const CitiesList = ({ data }) => {

  if (!data || data.length === 0) {
    return <h2>No cities yet</h2>;
  }

  return (
    <div>
        <h2>Cars list:</h2>
            {data.map(city => (
                <CityItem key={city._id} data={city} />
            ))}
    </div>
  )
}

export default CitiesList