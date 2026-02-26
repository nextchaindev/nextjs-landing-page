import { Phone } from "lucide-react";

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
        
        <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#0068FF] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
          <div className="w-[30px] h-[22px] bg-white rounded-[10px] flex items-center justify-center relative shadow-sm">
            <span className="text-[#0068FF] font-bold text-[10px] leading-none mb-[1px]">
              Zalo
            </span>
            <div className="absolute -bottom-[3px] left-[6px] w-0 h-0 border-l-[3px] border-l-transparent border-t-[5px] border-t-white border-r-[3px] border-r-transparent transform -rotate-12" />
          </div>
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
