import React from 'react'
import CityItem from '../CityItem/CityItem'
import { Link } from "react-router-dom";
import './CityList.scss'

const CitiesList = ({ data, onDelete }) => {

  if (!data || data.length === 0) {
    return <h2>No cities yet</h2>;
  }

  return (
    <>
      <h2>Cities list:</h2>
        <div className="city-list-container">
          {data.map(city => (
            <Link to={`/cities/${city._id}`} key={city._id} >
              <CityItem 
                  data={city} 
                  onDelete={onDelete}
                />
            </Link>    
            ))}    
        </div>
    </>
  )
}

export default CitiesList