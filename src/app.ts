import express from "express"
import dotenv from "dotenv"
import axios from "axios"
import fs from "fs"
import sharp from "sharp"
import FormData from "form-data"
import { nanoid } from "nanoid"
import {
	Client,
	middleware,
	MiddlewareConfig,
	WebhookEvent
} from "@line/bot-sdk"
dotenv.config()

const app = express()

if (
	!process.env.CHANNEL_ACCESS_TOKEN ||
	!process.env.CHANNEL_SECRET ||
	!process.env.BACKEND_API_URL
) {
	throw new Error(
		"Specify BACKEND_API_URL, CHANNEL_ACCESS_TOKEN and CHANNEL_SECRET in environment"
	)
}

const client = new Client({
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET
})

const middlewareConfig: MiddlewareConfig = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET
}

// const grpcClient = new PapayaServiceClient('localhost:8000', credentials.createInsecure())

app.get("/ping", (req, res) => {
	res.send({
		message: "pong",
		timestamp: new Date().toISOString()
	})
})

app.post("/line/webhook", middleware(middlewareConfig), async (req, res) => {
	const events: WebhookEvent[] = req.body.events

	for (const event of events) {
		if (event.type === "message") {
			const message = event.message
			if (message.type === "text") {
				client.replyMessage(event.replyToken, {
					type: "text",
					text: "This is Pog Pog Papaya Ripeness bot. You can send me a picture of payaya and I will tell you if it's ripe, unripe, or medium."
				})
			}
			if (message.type === "image") {
				const res = await axios.get(
					`https://api-data.line.me/v2/bot/message/${message.id}/content`,
					{
						headers: {
							Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
						},
						responseType: "stream"
					}
				)
				const imgPath = nanoid() + ".jpeg"
				const processedImgPath = nanoid() + ".jpeg"
				const writer = fs.createWriteStream(imgPath)
				res.data.pipe(writer)
				await new Promise((resolve, reject) => {
					writer.on("finish", resolve)
					writer.on("error", reject)
				})
				await sharp(imgPath).resize(150, 150).jpeg().toFile(processedImgPath)

				// Get prediction
				const formData = new FormData()
				formData.append("image", fs.createReadStream(processedImgPath))
				try {
					const { data: prediction } = await axios.post(
						`${process.env.BACKEND_API_URL}/api/papaya/predict`,
						formData,
						{
							headers: { ...formData.getHeaders() }
						}
					)

					client.replyMessage(event.replyToken, {
						type: "text",
						text: getMsg(prediction.classification, prediction.confidence)
					})
				} catch (error: any) {
					console.log(error.response.data)
				}
				fs.unlinkSync(imgPath)
				fs.unlinkSync(processedImgPath)
			}
		}
	}

	res.status(200).send({
		status: "success"
	})
})

const getMsg = (label: string, confidence: number): string => {
	const roundedConfidence = Math.round(confidence*100)/100
	const template: string[] = [
		`Papaya is ${label} with ${roundedConfidence} confidentiality`,
		`I'm ${roundedConfidence * 100}% sure that this papaya is ${label}`
	]
	const randIndex = Math.floor(Math.random() * template.length)
	return template[randIndex]
}

export default app
