'use server'
import OpenAI from "openai";

async function TTS({ text }: { text: string }) {


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const voice = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text
    })

    const blob = await voice.blob()
    const url = URL.createObjectURL(blob)
    console.log(url)

}

export default TTS