
import Link from "next/link"
import Image from 'next/image';
import { GoldenIcon } from "./golden-icon";
import { Book, Cuboid, MessageCircle, Phone, Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-[75] p-4 bg-foreground w-full lg:px-[150]">
      <section className="flex flex-row flex-wrap w-full">
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link">
              <Image
                src="/Logo.svg"
                alt="Nidaa Hajj Logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
              <div className="golden-text text-2xl font-bold">
                النداء للحج والعمرة
              </div>
            </Link>


          </div>
          <a className="flex items-center mt-4 gap-4 nav-link" href="tel:+96897477488">
            <GoldenIcon icon={Phone} />
            <span className="text-xl text-transparent golden-text bg-clip-text">97477488 </span>
          </a>

          <a className="flex items-center mt-4 gap-4 nav-link" href="tel:+96897477488">
            <GoldenIcon icon={MessageCircle} />
            <span className="text-xl text-transparent golden-text bg-clip-text">تحدث معنا على واتساب</span>
          </a>
        </div>

        <div className="flex flex-col flex-1 lg:items-end">
          <p className="text-transparent golden-text mt-12 lg:mt-4 text-2xl"> الروابط السريعة</p>

          <div>
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link mt-4">
              <GoldenIcon icon={Plane} />

              <div className="golden-text text-lg">
                العروض
              </div>
            </Link>

            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link mt-4">
              <GoldenIcon icon={Cuboid} />

              <div className="golden-text text-lg">
                برامج الحج
              </div>
            </Link>

            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link mt-4">
              <GoldenIcon icon={Book} />

              <div className="golden-text text-lg">
                برامج العمرة
              </div>
            </Link>

          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full my-8">
        <p className="golden-text text-center">
          حقوق الطبق والنشر محفوظة لدى مؤسسة النداء للحج والعمرة
        </p>

      </section>
    </footer>
  )
}
