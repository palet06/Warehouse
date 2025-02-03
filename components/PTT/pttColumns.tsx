"use client"

import { PTTResponseType } from "@/app/types/PTTDataTypes"
import { ColumnDef } from "@tanstack/react-table"



export const columnsPTT: ColumnDef<PTTResponseType>[] = [
  {
    accessorKey: "alici",
    header: "Alıcı",
  },
  {
    accessorKey: "barno",
    header: "Barkod Numarası",
  },
  {
    accessorKey: "tesalan",
    header: "Teslim Alan",
  },
  {
    id: "islem_merkezi", // id kullanarak benzersiz bir anahtar belirtiyoruz
    header: "İşlem Merkezi",
    cell: ({ row }) => {
      const dongu = row.original.dongu; 
      return dongu?.length ?
      (<div className="flex flex-col items-start justify-center gap-4">
          {dongu.map((a,i)=>(<p key={i}>{a.imerk}</p>)) }
      </div>):"Bilinmiyor"
    },
  },
  {
    id: "islem", // Farklı bir id belirliyoruz
    header: "İşlem",
    cell: ({ row }) => {
      const dongu = row.original.dongu; 
      return dongu?.length ?(<div className="flex flex-col items-start justify-center gap-4">
        {dongu.map((a,i)=>(<p key={i}>{a.islem}</p>)) }
    </div>):"Bilinmiyor"
    },
  },
  {
    id: "islem_tarihi",
    header: "İşlem Tarihi",
    cell: ({ row }) => {
      const dongu = row.original.dongu; 
      return dongu?.length ? (<div className="flex flex-col items-start justify-center gap-4">
        {dongu.map((a,i)=>(<p key={i}>{a.itarih}</p>)) }
    </div>):"Bilinmiyor"
    },
  },
]
