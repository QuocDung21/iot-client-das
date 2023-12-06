import connectToDB from "@/database";
import Esp from "@/models/esp";
import {NextResponse} from "next/server";
import Home from "@/models/home";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const getEsp = await Esp.find({}).sort({createdAt: -1});
        if (getEsp) {
            return NextResponse.json({
                success: true,
                data: getEsp,
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
