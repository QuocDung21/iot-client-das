import connectToDB from "@/database";
import Esp from "@/models/esp";
import {NextResponse} from "next/server";
import Home from "@/models/home";

export const dynamic = "force-dynamic";


async function calculateAverage(dataArray) {
    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    return sum / dataArray.length;
}
export async function GET(req) {
    const lmit = req.nextUrl.searchParams.get("lmit")
    try {
        await connectToDB();
        const getEsp = await Esp.findOne({}).sort({createdAt: -1});
        const getHome = await Home.findOne({}).sort({createdAt: -1});
        const getDataDas = await Esp.find({}).sort({createdAt: -1}).limit(parseInt(lmit));
        if (getEsp) {
            const tempArray = getDataDas.map(entry => entry.temp);
            const humidArray = getDataDas.map(entry => entry.humid);

            const averageTemp = await calculateAverage(tempArray);
            const averageHumi = await calculateAverage(humidArray);
            const time = getDataDas.map(entry => formatTime(entry.createdAt));
            return NextResponse.json({
                success: true,
                data: {
                    esp: getEsp,
                    home: getHome,
                    dataDas: getDataDas,
                    temp: tempArray,
                    humi: humidArray,
                    time: time,
                    averageTemp: averageTemp,
                    averageHumi: averageHumi,
                },
            });
        } else {
            return NextResponse.json({
                success: false,
                message:
                    "failed to fetch the products ! Please try again after some time",
            });
        }
    } catch (e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}

function formatTime(createdAt) {
    const dateObject = new Date(createdAt);
    return dateObject.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}