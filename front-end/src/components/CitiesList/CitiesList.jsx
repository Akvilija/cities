import React from 'react'
import CityItem from '../CityItem/CityItem';

const CitiesList = ({ data, onEdit, onDelete }) => {

  if (!data || data.length === 0) {
    return <h2>No cities yet</h2>;
  }

  return (
    <div>
        <h2>Cities list:</h2>
            {data.map(city => (
                <CityItem 
                  key={city._id} 
                  data={city} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
            ))}
    </div>
  )
}

export default CitiesList