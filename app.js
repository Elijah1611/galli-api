const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({ message: 'Hello Azure'})
})

const PORT = process.env.PORT || 5200

app.listen(PORT, () => {
    console.log('Server started on ' + PORT + '!')
})