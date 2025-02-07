"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "../DialogContext";

export function DetailedQueryDialog() {
  const { closeDQDDialog, isDQDDialogOpen } = useDialog();

  return (
    <Sheet  open={isDQDDialogOpen} >
      <SheetContent className="[&>button]:hidden"  side="bottom" >
        <SheetHeader >
          <SheetTitle>Ayrıntılı Sorgulama</SheetTitle>
          <SheetDescription>
           Aşağıda belirtilen kriterlere göre sorgulama yapabilirsiniz
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 h-[350px]">
            Başvuru tipi, Başvuru türü, çalışma izni türü, cinsiyet, geçici koruma statüsü, işlem tipi, firma tipi, izin durumu, pasaport type, uyruk 
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username"  className="col-span-3" />
          </div> */}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button  onClick={closeDQDDialog}>
              Kapat
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
