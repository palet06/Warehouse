
import { NextRequest, NextResponse } from "next/server";
import { searchAllUsers, searchBySamAccountName } from "@/lib/ldapConfig";

export async function GET() {
  try {
    const users = await searchAllUsers();
    return NextResponse.json({ success: true, data: users });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { samAccountName } = await req.json() as { samAccountName: string };
  try {
    const user = await searchBySamAccountName(samAccountName);

    if (user) {
      return NextResponse.json({ success: true, data: user });
    } else {
      return NextResponse.json(
        { success: false, error: "bulunamadı" },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
