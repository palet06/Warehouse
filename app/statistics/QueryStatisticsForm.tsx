import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function QueryStatisticsForm() {
  return (
    <Select  >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seçiniz" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          <SelectLabel>İstatistikler</SelectLabel>
          <SelectItem value="1">Uyruk bazında çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="2">İl bazında çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="3">Meslek seçimine göre çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="4">Eğitim durumuna göre çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="5">Cinsiyete göre çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="6">Yaş aralığına göre çalışma izinleri dağılımı</SelectItem>
          <SelectItem value="7">Nace koduna göre çalışma izinleri dağılımı</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
