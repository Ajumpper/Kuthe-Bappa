import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="grid h-dvh place-items-center bg-[#12040c] text-[#e8c36a]">
          <p className="text-2xl tracking-[0.35em]">KUTHE BAPPA</p>
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
