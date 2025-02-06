
import { NextResponse } from "next/server";
import { searchAllUsers } from "@/lib/ldapConfig";

export async function GET() {
  try {
    const users = await searchAllUsers();
    return NextResponse.json({ success: true, data: users },{status:200});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("UIGM Kullanıcıları getirilirken hata oluştu.");
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
