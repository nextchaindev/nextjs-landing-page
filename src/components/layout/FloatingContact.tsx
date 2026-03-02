import { Phone } from "lucide-react";
import Image from "next/image";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0909807687" //
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center"
        aria-label="Liên hệ Zalo"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#0068FF] opacity-30 blur-xl scale-150 group-hover:opacity-50 transition-opacity duration-300" />
        {/* Radar ping effect */}
        <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />

        <div className="relative flex items-center justify-center rounded-full bg-[#0068FF] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/images/zalo-icon.png"
            alt="Zalo"
            width={56}
            height={56}
          />
        </div>
      </a>

      {/* Phone Button */}
      <a
        href="tel:0909807687" // TODO: Thay số điện thoại thực tế
        className="relative group flex items-center justify-center mt-2"
        aria-label="Gọi điện thoại"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#00C35B] opacity-30 blur-xl scale-150 group-hover:opacity-50 transition-opacity duration-300" />
        {/* Radar ping effect */}
        <div className="absolute inset-0 rounded-full bg-[#00C35B] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />

        <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#00C35B] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Phone className="w-7 h-7" strokeWidth={2.5} />
        </div>
      </a>
    </div>
  );
}
