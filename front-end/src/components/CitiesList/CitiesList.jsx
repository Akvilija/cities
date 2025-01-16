import React from 'react'
import CityItem from '../CityItem/CityItem'
import './CityList.scss'

const CitiesList = ({ data, onEdit, onDelete }) => {

  if (!data || data.length === 0) {
    return <h2>No cities yet</h2>;
  }

  return (
    <>
      <h2>Cities list:</h2>
        <div className="city-list-container">
          {data.map(city => (
                <CityItem 
                  key={city._id} 
                  data={city} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
            ))}    
        </div>
    </>
  )
}

export default CitiesList