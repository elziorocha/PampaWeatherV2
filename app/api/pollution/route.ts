import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const searchParams = req.nextUrl.searchParams

        const lat = searchParams.get("lat")
        const lon = searchParams.get("lon")

        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

        const res = await axios.get(url);

        return NextResponse.json(res.data)
        
    } catch (error) {
        console.log("Error in getting Air Pollution data", error)
        return new Response("Error in getting Air Pollution data", { status: 500 })
    }
}