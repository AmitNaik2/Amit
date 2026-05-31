"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string;
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [colorClass, setColorClass] = useState<string>("text-green-500");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (!endDate || endDate === "N/A" || endDate === "2099-12-31") {
      setTimeLeft("Limited Time");
      setColorClass("text-green-500");
      return;
    }

    const endStr = endDate.includes(" ") && !endDate.includes("Z") && !endDate.includes("GMT")
      ? endDate.replace(" ", "T") + "Z"
      : endDate;

    const calculateTimeLeft = () => {
      const end = new Date(endStr).getTime();
      const now = Date.now();
      const difference = end - now;

      if (isNaN(difference)) return "";

      if (difference <= 0) {
        return "Expired";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days >= 2) {
        setColorClass("text-green-500");
      } else if (days >= 0 && hours >= 12 || days === 1) {
        setColorClass("text-yellow-500");
      } else {
        setColorClass("text-red-500");
      }

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0 || days > 0) parts.push(`${hours}h`);
      parts.push(`${minutes}m`);

      return parts.join(" ");
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, isMounted]);

  if (!isMounted || !timeLeft) return null;

  return (
    <span className={`font-orbitron font-bold uppercase tracking-widest text-sm ${colorClass}`}>
      {timeLeft === "Expired" || timeLeft === "Limited Time" ? timeLeft : `Expires in ${timeLeft}`}
    </span>
  );
}
