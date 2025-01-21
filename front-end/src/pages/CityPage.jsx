import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../config'
import CityDetail from '../components/CityDetail/CityDetail';
import CitiesForm from '../components/Form/CitiesForm';

const CityPage = () => {
    const { id } = useParams()
    const [city, setCity] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch(`${API_URL}/cities/${id}`)
                if (!res.ok) {
                    throw new Error('Failed to fetch city')
                }

                const cityData = await res.json()
                setCity(cityData)
            } catch (error) {
                console.error("Error fetching city:", error)
                setCity({})
            }
        }
        fetchCity()
    }, [id])

    const editCityHandler = async updatedCity => {
        const { _id, ...cityData } = updatedCity

        try {
            const res = await fetch(`${API_URL}/cities/${updatedCity._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData),
            })

            if (!res.ok) {
                throw new Error('Failed to update city')
            }

            const data = await res.json()
            setCity(data)
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating city:', error)
        }
    }

    const cancelEditHandler = () => {
        setIsEditing(false)
      }

    return (
        <div className="city-container">
            {isEditing ? (
                <CitiesForm  cityToEdit={city} onEditCityHandler={editCityHandler} onCancelEdit={cancelEditHandler}/>
            ) : (

            <CityDetail city={city} onEdit={() => setIsEditing(true)} />
            )}
        </div>
    );
};

export default CityPage;