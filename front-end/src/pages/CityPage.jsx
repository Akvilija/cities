import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../config'
import CityDetail from '../components/CityDetail/CityDetail';

const CityPage = () => {
    const { id } = useParams()
    const [city, setCity] = useState({})

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
    return (
        <div className="city-container">
            <CityDetail city={city} />
        </div>
    );
};

export default CityPage;