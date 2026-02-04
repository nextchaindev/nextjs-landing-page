import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface CounterStatProps {
  target: number;
  suffix?: string;
  label: string;
  isVisible: boolean;
}

export const CounterStat = ({ target, suffix = "", label, isVisible }: CounterStatProps) => {
  const count = useCounterAnimation(target, 2000, isVisible);

  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold text-blue-600 font-[Be_Vietnam_Pro] md:text-[36px]">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
};
