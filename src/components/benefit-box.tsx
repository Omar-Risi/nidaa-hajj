"use client"
import { GoldenIcon } from "./golden-icon";
import { LucideIcon } from "lucide-react";

interface BenefitBoxProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function BenefitBox({ icon: Icon, title, description }: BenefitBoxProps) {
  return (
    <div className="p-4 shadow-foreground/25 flex flex-col gap-4 bg-white rounded-lg">
      <div className="golden w-fit aspect-square p-4 rounded-full">
        <Icon className="text-foreground" />
      </div>
      <p className="text-xl font-bold text-gold-start">{title}</p>
      <p className="text-foreground">{description}</p>
    </div>
  );
};
