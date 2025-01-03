"use client"

import { ContentItem } from "@/app/types/data-types/dataTypes"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.




export const columns: ColumnDef<ContentItem>[] = [
	{
		accessorKey: "basvuruNo",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Başvuru No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "yabanciKimlikNumarasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Yabancı Kimlik No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "adi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Adı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "soyadi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Soyadı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "dogumTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Doğum Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("dogumTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "basvuruTuru",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Başvuru Türü
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "basvuruTipi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Başvuru Tipi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "islemAciklamasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşlem Açıklaması
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "islemTipi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşlem Tipi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "islemTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşlem Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("islemTarihi")
			return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "sonDegisiklikZamani",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Son Değişiklik Zamanı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("sonDegisiklikZamani")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "olusturulmaZamani",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Oluşturulma Zamanı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("olusturulmaZamani")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "basvuruTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Başvuru Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("basvuruTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "basvuruKararTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Başvuru Karar Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("basvuruKararTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "izinDurumu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İzin Durumu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "calismaIzniTuru",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışma İzni Türü
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "reddeItirazKararTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Redde İtiraz Karar Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("reddeItirazKararTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "reddeItirazTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Redde İtiraz Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("reddeItirazTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	 
	  
	  {
		accessorKey: "uzatmaBasvurusununYapildigiBasvuruNo",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Uzatma Başvurusu No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "talepEdilenIzinBaslangicTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Talep Edilen İzin Başlangıç Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("talepEdilenIzinBaslangicTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "talepEdilenIzinBitisTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Talep Edilen İzin Bitiş Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("talepEdilenIzinBitisTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "retAciklamasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Ret Açıklaması
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			
			return (

				<p className="text-left !text-wrap">{row.getValue("retAciklamasi")}</p>
			)
		
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "serhler",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Şerhler
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			
			return (

				<p className="text-left !text-wrap">{row.getValue("serhler")}</p>
			)

			
		
		  },
		enableSorting: true,
	  },
	  
	  {
		accessorKey: "aylikBrutUcret",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Aylık Brüt Ücret
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "paraBirimi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Para Birimi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "meslekTanim",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Meslek Tanımı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "meslekIskurKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Meslek İŞKUR Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isvereniVarMi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşvereni Var mı?
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const what = row.getValue("isvereniVarMi")
			return what === true ? "Var": what ===false?"Yok":""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriSgkTescilNumarasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri SGK Tescil No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriIl",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri İl
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriIlce",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri İlçe
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriIlceKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri İlçe Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriMeskenId",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Mesken ID
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriAdresi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Adresi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			
			return (

				<p className="text-left">{row.getValue("isyeriAdresi")}</p>
			)

			
		
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriUnvan",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Unvanı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			
			return (

				<p className="text-left">{row.getValue("isyeriUnvan")}</p>
			)

			
		
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriNaceKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri NACE Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriSermayeYapisi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Sermaye Yapısı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriFirmaTipi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Firma Tipi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "isyeriVergiNumarasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İşyeri Vergi No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiIl",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı İl
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiIlKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı İl Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiIlce",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı İlçe
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiIlceKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı İlçe Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiMeskenId",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı Mesken ID
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "calisacagiAdres",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Çalışacağı Adres
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true,
	  },
	  {
		accessorKey: "onayVerilenBaslangicTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Onay Verilen Başlangıç Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("onayVerilenBaslangicTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "onayVerilenBitisTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Onay Verilen Bitiş Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("onayVerilenBitisTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "aktiflesmeTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Aktifleşme Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("aktiflesmeTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "onayTebligTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Onay Tebliğ Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("onayTebligTarihi")
			return date ? format(new Date(date as string), "dd/MM/yyyy HH:mm") : ""
		  },
		enableSorting: true,
	  },
	  {
		accessorKey: "iptalSonlandirmaTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İptal Sonlandırma Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("iptalSonlandirmaTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "iptalSonlandirmaGerekcesi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İptal Sonlandırma Gerekçesi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "izinVerilenIl",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İzin Verilen İl
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "izinAktifMi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İzin Aktif Mi?
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			const what = row.getValue("izinAktifMi")
			return what === true ? "Aktif": what ===false?"Aktif Değil":""
		  },
		enableSorting: true
	  },
	  
	  
	  
	  {
		accessorKey: "babaAdi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Baba Adı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "anaAdi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Ana Adı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "cinsiyeti",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Cinsiyeti
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "dogumYeri",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Doğum Yeri
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "dogumYeriKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Doğum Yeri Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	 
	  {
		accessorKey: "medeniHali",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Medeni Hali
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "ikametIlKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İkamet İl Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "ikametIl",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İkamet İl
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "ikametVerilisAmaci",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			İkamet Veriliş Amacı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "uyruk",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Uyruk
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "uyrukKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Uyruk Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "uyrukDiger",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Uyruk Diğer
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "esininAdi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eşinin Adı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "esininSoyadi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eşinin Soyadı
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "esTckn",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eş TCKN
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "geciciKorumaStatusu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Geçici Koruma Statüsü
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "esUyruk",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eş Uyruk
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "esUyrukKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eş Uyruk Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "eposta",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			E-posta
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "eposta2",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			E-posta 2
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "telefon",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Telefon
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "telefon2",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Telefon 2
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "telefonKodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Telefon Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "telefon2Kodu",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Telefon 2 Kodu
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "adres",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Adres
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
			
			return (

				<p className="text-left text-wrap">{row.getValue("adres")}</p>
			)

			
		
		  },
		enableSorting: true
	  },
	  {
		accessorKey: "disIsleriReferansNumarasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Dışişleri Referans No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  
	  {
		accessorKey: "pasaportNumarasi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Pasaport No
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "pasaportSonGecerlilikTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Pasaport Son Geçerlilik Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("pasaportSonGecerlilikTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "passportType",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Pasaport Türü
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "anadil",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Ana Dil
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "bilinenDiller",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Bilinen Diller
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "turkceSeviyesi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Türkçe Seviyesi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "egitimSeviyesi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Eğitim Seviyesi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "liseOkul",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Lise Okul
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "universiteOkul",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Üniversite Okul
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "universiteBolum",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Üniversite Bölüm
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "universiteBaslangicTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Üniversite Başlangıç Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("universiteBaslangicTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "universiteMezuniyetTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Üniversite Mezuniyet Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("universiteMezuniyetTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "yuksekogretimOkul",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Yükseköğretim Okul
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "yuksekogretimBolum",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Yükseköğretim Bölüm
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		enableSorting: true
	  },
	  {
		accessorKey: "yuksekogretimBaslangicTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Yükseköğretim Başlangıç Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("yuksekogretimBaslangicTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  },
	  {
		accessorKey: "yuksekogretimMezuniyetTarihi",
		header: ({ column }) => (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			Yükseköğretim Mezuniyet Tarihi
			<ArrowUpDown className="ml-2 h-4 w-4" />
		  </Button>
		),
		cell: ({ row }) => {
		  const date = row.getValue("yuksekogretimMezuniyetTarihi")
		  return date ? format(new Date(date as string), "dd.MM.yyyy HH:mm") : ""
		},
		enableSorting: true
	  }
  ];
