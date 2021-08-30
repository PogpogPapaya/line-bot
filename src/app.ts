import express from 'express'

const app = express()

app.get('/ping', (req, res) => {
    res.send({
        message: 'pong',
        timestamp: new Date().toISOString(),
    })
})

export default app