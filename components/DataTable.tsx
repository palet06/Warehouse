"use client";
import * as React from "react";
import { format } from "date-fns"
import { ExportAsExcel } from "react-export-table";


import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	userEmail:any;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	userEmail
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const numberColumn: ColumnDef<TData, TValue> = {
		accessorKey: "index",
		header: "Sn",
		minSize: 5,
		maxSize: 15,
		enableSorting: true,
		cell: ({ row }) => row.index + 1,
		enableHiding: false, // Bu sütunun gizlenmesini engelle
	};
	const allColumns = [numberColumn, ...columns];
	const table = useReactTable({
		data,
		columns: allColumns,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnVisibility,
		},
	});

	// Sıralama değiştiğinde Sn sütununu güncelle
	
	

	const visibleHeaders = table
		.getHeaderGroups()[0]
		.headers.filter((header) => header.column.getIsVisible())
		.reduce((acc, header) => {
			const headerValue =
				header.column.id === "index"
					? "Sn"
					: typeof header.column.columnDef.header === "string"
						? header.column.columnDef.header
						: header.column.id;
			return { ...acc, [header.column.id]: headerValue };
		}, {});

	// Visible kolonlara göre filtrelenmiş data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const visibleData = data?.map((row: any, index: number) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const filteredRow: any = {};
		Object.keys(visibleHeaders).forEach((columnId) => {
			// index kolonu için özel işlem
			if (columnId === "index") {
				filteredRow[columnId] = index + 1;
			} else {
				filteredRow[columnId] = row[columnId];
			}
		});

		return filteredRow;
	});
	const newDate = new Date(Date.now())
	
	const filenameDate =format(newDate, "dd.MM.yyyy HH:mm")
	
	 

	return (
		<div>
			<div className="flex  w-52 items-center justify-start gap-7 pb-2" >

		
				
			<ExportAsExcel  data={visibleData} headers={Object.values(visibleHeaders)} fileName={`${userEmail} ${filenameDate.toString()}`} name="Sorgu Listesi">
							
				{({ onClick }) => (
					<Button className="p-5" variant="outline" onClick={onClick}>
						<Image src="/excel.svg" alt="logo" width={100} height={100} />
						Excele Aktar
					</Button>
				)}
			</ExportAsExcel>	
			
			



			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="ml-auto p-5">
					<Image src="/show.png" alt="logo" width={100} height={100} />
						Alanları Göster/Gizle
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent  align="start">
					<div className="flex flex-col  h-80 !overflow-y-scroll">
						<ul>
							{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<li key={column.id}>
									<DropdownMenuCheckboxItem 
								    
									
									
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
									onSelect={(e) => e.preventDefault()}

								>
									{typeof column.columnDef.header === "string"
										? column.columnDef.header
										: column.id}
								</DropdownMenuCheckboxItem>
								</li>
								
							);
						})}
						</ul>
						
					</div>
					
				</DropdownMenuContent>
			</DropdownMenu>
			</div>
			<div className="rounded-md border max-w-screen-2xl overflow-x-auto relative">
				<Table className="table-bordered w-full max-w-screen-2xl overflow-x-auto whitespace-nowrap">
					<TableHeader>
						{table?.getHeaderGroups()?.map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead 
											key={header.id} 
											style={{ width: `${header.getSize()}px` }}
											className="text-center"
										>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell 
											key={cell.id} 
											className="table-cell-bordered text-center"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center table-cell-bordered"
								>
									Bir sonuç bulunamadı
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between py-2 text-sm text-gray-500">
				<div>
					Toplam {data.length} kayıttan{" "}
					{table.getRowModel().rows.length} kayıt gösteriliyor
				</div>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Önceki
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Sonraki
				</Button>
			</div>
		</div>
	);
}
