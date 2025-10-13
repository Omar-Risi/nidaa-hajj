import { GoldenIcon } from "./golden-icon";

export function BenefitBox({ icon: Icon, title, description }) {
  return (
    <div className="p-4 rounded-md bg-white shadow-md shadow-foreground/25 flex flex-col">
      <div className="bg-gold-start/15 rounded-full p-4 aspect-square w-fit flex justify-center items-center">
        <GoldenIcon icon={Icon} />
      </div>
      <p className="text-xl font-bold golden-text">{title}</p>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};
