const CityItem = ({ data }) => {

    const { name, population } = data

  return (
    <div>
        <ul>
            {name && <li>Name: {name}</li>}
            {population && <li>Population: {population}</li>}
        </ul>
    </div>
  )
}

export default CityItem