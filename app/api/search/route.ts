import { NextResponse } from "next/server";
import {
  GetAllDataFromWarehouse,
  GetSpesificDataFromWarehouse,
} from "@/lib/serveractions/actions";

export async function GET() {
  try {
    const data = await GetAllDataFromWarehouse();
    return NextResponse.json(data.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Sorgulama hatası" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const basvuruNo = searchParams.get("basvuruNo");

  try {
    const data = await GetSpesificDataFromWarehouse(basvuruNo!);
    return NextResponse.json(data.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Sorgulama hatası" }, { status: 500 });
  }
}
