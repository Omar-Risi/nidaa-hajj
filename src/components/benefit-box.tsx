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
    <div className="p-4 rounded-md shadow-foreground/25 flex gap-4">
      <Icon className="text-gold-start" />
      <p className="text-xl font-bold text-gold-start">{title}</p>
    </div>
  );
};
