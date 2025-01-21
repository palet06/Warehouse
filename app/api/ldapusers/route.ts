import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { searchAllUsers,searchBySamAccountName } from '@/lib/ldapConfig';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    const users = await searchAllUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {


 
  
  const {samAccountName} = req.body
  try {

    const user = await searchBySamAccountName(samAccountName) 
    
    if (user) {
      return NextResponse.json({ success: true, data: user });
    } else {
      return NextResponse.json({ success: false, error: "bulunamadı" }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }


}