import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 w-full h-[600px] ">
          <div className="mx-auto max-w-screen-sm text-center flex flex-col items-center gap-5">
            <div>
              <Image src="logo.svg" height={100} width={100} alt="logo" />
            </div>
            <div>
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-csgbBgRed dark:text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Sayfa Bulunamadı
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Ulaşmaya çalıştığınız sayfayı malesef bulamadık.{" "}
              </p>
            </div>

            <Link href="/">
              <Button variant="csgb">Anasayfa</Button>
            </Link>
          </div>
        </section>
  );
}
