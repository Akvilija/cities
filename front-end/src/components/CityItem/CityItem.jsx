const CityItem = ({ data }) => {

    const { name } = data

  return (
    <div>
        <ul>
            {name && <li>Name: {name}</li>}
        </ul>
    </div>
  )
}

export default CityItem