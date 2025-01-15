const { getDB } = require('../db')
const { ObjectId } = require('mongodb')

async function getAllCities() {
    try {
        const db = getDB()
        const collection = db.collection('cities')
        const categories = await collection.find().toArray()
        return categories
    } catch (error) {
        console.error('Failed to get cities:', error)
        throw new Error('Failed to get cities')
    }
    
}

async function createCity(newCity) {
    try {
        const db = getDB()
        const collection = db.collection('cities')
        const result = await collection.insertOne(newCity)
        return result
    } catch (error) {
        console.error('Failed to create city:', error)
        throw new Error('Failed to create city')
    }
}

async function updateCity(id, updatedCity) {
    try {
        const db = getDB()
        const collection = db.collection('cities')
        const result = await collection.updateOne(
            { _id: ObjectId.createFromHexString(id) }, 
            { $set: updatedCity }
        )  

        if (result.matchedCount === 0) {
            throw new Error("City not found")
        }

        return { message: "City updated successfully" }
    } catch (error) {
        console.error(`Failed to update city with ID: ${id}`, error)
        throw new Error('Failed to update city')
    }
}

async function deleteCity(id) {
    try {
        const db = getDB()
        const collection = db.collection('cities')

        const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })

        if (result.deletedCount === 0) {
            throw new Error("City not found")
        }

        return { message: "City deleted successfully" }
    } catch (error) {
        console.error(`Failed to delete city with ID: ${id}`, error)
        throw new Error('Failed to delete city')
    }
}

module.exports = { 
    getAllCities, 
    createCity, 
    updateCity, 
    deleteCity }