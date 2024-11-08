import HomeNav from "@/components/navbar/home-nav";
import PlansSection from "./plans";
import BigFooter from "@/components/footer/big-footer";
import OtherServices from "./other-services";
import Products from "./products";

export default function Pricing() {
  return (
    <>
      <HomeNav />
      <main className="py-10 flex flex-col gap-5">
        <div className="flex">
          <PlansSection />
        </div>
        <div className="flex">
          <OtherServices />
        </div>
        <div className="flex">
          <Products />
        </div>
      </main>
      <BigFooter />
    </>
  );
}
