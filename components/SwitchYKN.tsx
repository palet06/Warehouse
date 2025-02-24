import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchYKN() {
  return (
    <div className="flex items-center space-x-2">
      <Switch  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-csgbBgRed/20"  id="multipleykn" />
      <Label htmlFor="airplane-mode">Çoklu YKN</Label>
    </div>
  )
}
