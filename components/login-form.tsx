import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold font-rubik">Giriş Yapın</h1>
        <p className="text-balance text-sm text-slate-500 dark:text-slate-400">
          E-posta ve şifrenizle giriş yapın
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-Posta</Label>
          <Input id="email" type="email" placeholder="m@csgb.gov.tr" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Şifre</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Şifrenizi mi unuttunuz?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-csgbBgRed hover:bg-csgbMenuBgRed hover:outline-black hover:outline hover:outline-1">
          Giriş
        </Button>
        
       
      </div>
      <div className="text-center text-sm">
        Hesabınız yok mu?{" "}
        <a href="#" className="underline underline-offset-4">
          Kayıt olun
        </a>
      </div>
    </form>
  )
}
