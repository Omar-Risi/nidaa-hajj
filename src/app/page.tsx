import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full max-h-[75vh] overflow-hidden flex">
        <div className="flex-1 relative flex">
          <div className="bg-black/50 w-full h-full absolute"></div>
          <Image src="/hero-bg.jpg" alt="Hero Background" width={1920} height={1080} className="flex-1 object-cover" />

        </div>
      </div>
    </>
  );
}
