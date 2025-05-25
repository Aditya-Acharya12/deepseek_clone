import connectDB from "@/config/mongodb";
import Chat from '../../../models/Chat';;
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; 

export async function POST(req) {
    try {
        const {userId} = getAuth(req);

        if(!userId)
        {
            return NextResponse.json({success:false,message:"User not authenticated"});
        }
        // prepare the chat data to be stored in the database

        const checkData = {
            userId,
            messages: [],
            name: "New Chat",
        };

        // connect to the database and craete a new chat
        await connectDB();
        await Chat.create(checkData);

        return NextResponse.json({
            success: true,
            message: "Chat created successfully",
        });

    }
    catch (error)
    {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}