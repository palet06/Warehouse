import { NextRequest, NextResponse } from "next/server";

import cron from "node-cron";

export async function GET() {
    console.log("api de get requeste girdi")
    const anyJobinMemory = cron.getTasks().entries()
    console.log("anyjobinmemory deişkeni",anyJobinMemory)
    const nedir =  anyJobinMemory.toArray()
    if (anyJobinMemory) {

        return NextResponse.json({nedir})
    }
    //return NextResponse.json({message:"Hafızada oluşturulmuş bir cron yok."})
}

export async function POST(req:NextRequest) {

    const { name, time } = await req.json();
    console.log("api gelen name",name)
    console.log("api gelen time",time)
    

    try {

        console.log("try'ın içine girildi")

        cron.schedule(time, () =>  {
            console.log('Task Çalıştı');
          }, {
            scheduled: false,
            name:name,
            timezone:"Turkey"
          });

        return NextResponse.json({message:"Job hafızada oluşturuldu"})
        
    } catch (error) {
        return NextResponse.json({message:"Cron oluşturulken hata oluştu"})
    }

    


    
}

export async function PUT() {
    
}


