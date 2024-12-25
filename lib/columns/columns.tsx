"use client"

import {  ContentItem } from "@/app/types/data-types/dataTypes"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<ContentItem>[] = [
   
  
  {
    accessorKey: "id",
    header: "Başvuru No",
  },
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "surname",
    header: "Soyisim",
  },
  {
    accessorKey: "age",
    header: "Yaş",
    
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            E-Posta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  
  
]
