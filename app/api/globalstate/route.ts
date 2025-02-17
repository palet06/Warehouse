import { NextResponse } from "next/server";
import EventEmitter from "events";
export const dynamic = "force-dynamic"; 

const eventEmitter = new EventEmitter();
let isActive = false; // Sunucu tarafında state saklanıyor

export function GET() {
  return NextResponse.json({ isActive });
}

export async function POST() {  
  isActive = !isActive;
  eventEmitter.emit("stateChanged", isActive); // Dinleyicilere bildir
  return NextResponse.json({ isActive });
}

// Event emitter'ı export et, client tarafı dinleyebilsin
export { eventEmitter };


