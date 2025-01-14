const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

const { MongoClient, ObjectId } = require('mongodb')
const URI = `mongodb+srv://akvilija:6uFdNI3IgTQDdlZ9@cluster0.jhf3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(URI)

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/cities', async (req, res) => {
    try {
        const connection = await client.connect()
        const data = await connection
                                .db('node-project')
                                .collection('cities')
                                .find()
                                .toArray()
        await connection.close()
        res.send(data)

    } catch(error) {
        res.status(500).send({ error})
    }
})

app.post('/cities', async (req, res) => {
    try {
        const { name, population, location } = req.body

        if (!name || !population || !location || !location.continent || !location.country) {
            return res.status(400).json({ error: 'All fields required' })
        }

        const connection = await client.connect()
        const result = await connection
            .db('node-project')
            .collection('cities')
            .insertOne({ 
                name,
                population,
                location
            })

        const newCity = {
            _id: result.insertedId,
            name,
            population,
            location
        }

        await connection.close()
        res.status(201).json(newCity)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create city' })
    }
})

app.put('/cities/:id', async (req, res) => {
    try {
        const { name, population, location } = req.body
        const { id } = req.params

        const connection = await client.connect()
        const result = await connection
            .db('node-project')
            .collection('cities')
            .updateOne({ _id: ObjectId.createFromHexString(id) }, {
                $set: {
                    name,
                    population,
                    location
                }
            })

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'City not found' });
            }

            await connection.close()

        return res.send(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update city' })
    }
})

app.delete('/cities/:id', async (req, res) => {
    const { id } = req.params
    try {
        const connection = await client.connect()
        const result = await connection
            .db('node-project')
            .collection('cities')
            .deleteOne({ _id: ObjectId.createFromHexString(id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'City not found' })
        }

        await connection.close()
        return res.send({ message: 'City deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete city' })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))