const express = require('express')
const {
    getAllCities,
    createCity,
    updateCity,
    deleteCity
} = require('../services/citiesServices')

const router = express.Router()

router.get('/cities', async (req, res) => {
    try {
        const cities = await getAllCities()
        res.status(200).json(cities)
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cities' })
    }
})

router.post('/cities', async (req, res) => {
    const newCity = req.body
    try {
        const result = await createCity(newCity)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create city' })
    }
})

router.put('/cities/:id', async (req, res) => {
    const { id } = req.params
    const updatedCity = req.body

    try {
        const result = await updateCity(id, updatedCity)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/cities/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await deleteCity(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete city' })
    }
})

module.exports = router