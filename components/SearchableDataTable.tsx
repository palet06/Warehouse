'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/DataTable"
import { columns } from "@/lib/columns/columns"

// interface SearchableDataTableProps {
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	initialData: any[]
// }

export function SearchableDataTable() {
	const [basvuruNo, setBasvuruNo] = useState('')
	const [tableData, setTableData] = useState()

	const handleSearch = async () => {
		// if (!basvuruNo) {
		// 	setTableData(initialData)
		// 	return
		// }

		try {
			const response = await fetch(`/api/search?basvuruNo=${basvuruNo}`) // API route'u oluşturmanız gerekecek
			const data = await response.json()
			if (data) {
				setTableData(data.content)
			}
			else {

				setTableData(undefined)
			}
		} catch (error) {
			console.error('Sorgulama hatası:', error)
		}
	}

	return (
		<>
			<div className="flex gap-4 mb-4">
				<Input
					type="text"
					value={basvuruNo}
					onChange={(e) => setBasvuruNo(e.target.value)}
					placeholder="Başvuru No giriniz"
					className="max-w-xs"
				/>
				<Button
					variant="default"
					onClick={handleSearch}
				>
					Sorgula
				</Button>
			</div>
			{tableData &&
				<DataTable columns={columns} data={tableData} />
			}
		</>
	)
}