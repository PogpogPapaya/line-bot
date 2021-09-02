import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import fs from 'fs'
import sharp from 'sharp'
import { credentials } from '@grpc/grpc-js'
import { nanoid } from 'nanoid'
import { Client, middleware, MiddlewareConfig, WebhookEvent, ImageMessage } from '@line/bot-sdk'
import { PapayaServiceClient } from '../proto/prediction-service_grpc_pb'
import { PredictionRequest, PredictionResponse } from '../proto/prediction-service_pb'
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

const grpcClient = new PapayaServiceClient('localhost:8000', credentials.createInsecure())

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
                    responseType: 'stream'
                })
                const imgPath = nanoid() + '.jpg'
                const processedImgPath = nanoid() + '.jpg'
                const writer = fs.createWriteStream(imgPath)
                res.data.pipe(writer)
                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve)
                    writer.on('error', reject)
                })
                const imgBuff = await sharp(imgPath).resize(150, 150).toBuffer()
            
                // Get prediction by grpc
                const predictionRequest = new PredictionRequest()
                predictionRequest.setImage(imgBuff.toString('base64'))
                grpcClient.predict(predictionRequest, (err, predictionResponse: PredictionResponse) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(predictionResponse.getLabel());
                        console.log(predictionResponse.getConfidence());
                    }
                    
                    client.replyMessage(event.replyToken, {
                        type: 'text',
                        text: 'Got an image'
                    })
                })

                
            }
        }
    }
    
    res.status(200).send({
        status: 'success'
    });
})

export default app