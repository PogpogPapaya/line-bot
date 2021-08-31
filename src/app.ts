import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import fs from 'fs'
import sharp from 'sharp'
import { Client, middleware, MiddlewareConfig, WebhookEvent, ImageMessage } from '@line/bot-sdk'
dotenv.config()

const app = express()

if (!process.env.CHANNEL_ACCESS_TOKEN || !process.env.CHANNEL_SECRET) {
    throw new Error('Specify CHANNEL_ACCESS_TOKEN and CHANNEL_SECRET in environment');
}

const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
})

const middlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

app.get('/ping', (req, res) => {
    res.send({
        message: 'pong',
        timestamp: new Date().toISOString(),
    })
})

app.post('/webhook', middleware(middlewareConfig), async (req, res) => {
    const events: WebhookEvent[] = req.body.events;

    for (const event of events) {
        if (event.type === 'message') {
            const message = event.message;
            if (message.type === 'text') {
                client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: message.text
                })
            }
            if (message.type === 'image') {
                const res = await axios.get(`https://api-data.line.me/v2/bot/message/${message.id}/content`, {
                    headers: {
                        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
                    },
                })
                const imageBinaryData = res.data
                const imageBinaryBuffer = Buffer.from(imageBinaryData, 'binary')
                fs.writeFileSync(`image.jpg`, imageBinaryBuffer)
                await sharp('image.jpg').resize(150, 150).png().toFile('img.png')
                client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: 'Got an image'
                })
            }
        }
    }
    
    res.status(200).send({
        status: 'success'
    });
})

export default app