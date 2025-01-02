import { NextResponse } from 'next/server'
import { getdata2, getdataAll } from '@/lib/serveractions/actions'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const basvuruNo = searchParams.get('basvuruNo')

	try {
		const data = await getdataAll()
		// const data = await getdata2(basvuruNo!) // getdata fonksiyonunu başvuru numarasına göre filtreleme yapacak şekilde güncellemeniz gerekecek
		return NextResponse.json(data.data)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({ error: 'Sorgulama hatası' }, { status: 500 })
	}
}