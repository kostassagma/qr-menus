"use client";
import CheckIcon from "@/icons/check";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface Props {
  shop: string;
}

const ChoosePlans: FC<Props> = ({ }) => {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");
  const [paymentForm, setPaymentForm] = useState<"card" | "deposit" | "cash">(
    "card"
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const planParam = searchParams.get("plan");

    if (planParam == "monthly" || planParam == "annual") {
      setPlan(planParam);
    }
  }, [searchParams, setPlan]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl">Επιλογή πλάνου:</h3>
        <div className="flex flex-row gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setPlan("monthly");
              setPaymentForm("card");
            }}
            className="py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:border-gray-600 hover:text-black transition-colors ease-in-out cursor-pointer flex flex-row gap-3 group"
          >
            {plan == "monthly" ? (
              <CheckIcon
                width={25}
                className="my-auto rounded-full border border-green-700 text-green-700 p-1"
              />
            ) : (
              <svg
                width={25}
                height={25}
                className="my-auto rounded-full border border-gray-300 group-hover:border-gray-600 p-1"
              />
            )}
            <p className="whitespace-nowrap my-auto">Μηνιαίο</p>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPlan("annual");
            }}
            className="py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:border-gray-600 hover:text-black transition-colors ease-in-out cursor-pointer flex flex-row gap-3 group"
          >
            {plan == "annual" ? (
              <CheckIcon
                width={25}
                className="my-auto rounded-full border border-green-700 text-green-700 p-1"
              />
            ) : (
              <svg
                width={25}
                height={25}
                className="my-auto rounded-full border border-gray-300 group-hover:border-gray-600 p-1"
              />
            )}
            <p className="whitespace-nowrap my-auto">Ετήσιο</p>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl">Επιλογή τρόπου πληρωμής:</h3>
        <div className="flex flex-row gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setPaymentForm("card");
            }}
            className="py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:border-gray-600 hover:text-black transition-colors ease-in-out cursor-pointer flex flex-row gap-3 group"
          >
            {paymentForm == "card" ? (
              <CheckIcon
                width={25}
                className="my-auto rounded-full border border-green-700 text-green-700 p-1"
              />
            ) : (
              <svg
                width={25}
                height={25}
                className="my-auto rounded-full border border-gray-300 group-hover:border-gray-600 p-1"
              />
            )}
            <p className="whitespace-nowrap my-auto">Κάρτα</p>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPaymentForm("deposit");
            }}
            disabled={plan == "monthly"}
            className={
              plan == "annual"
                ? "py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:border-gray-600 hover:text-black transition-colors ease-in-out cursor-pointer flex flex-row gap-3 group"
                : "py-2 px-4 text-gray-400 border border-gray-200 rounded-md transition-colors ease-in-out flex flex-row gap-3 group cursor-not-allowed"
            }
          >
            {paymentForm == "deposit" ? (
              <CheckIcon
                width={25}
                className="my-auto rounded-full border border-green-700 text-green-700 p-1"
              />
            ) : (
              <svg
                width={25}
                height={25}
                className="my-auto rounded-full border border-gray-300 group-hover:border-gray-600 p-1"
              />
            )}
            <p className="whitespace-nowrap my-auto">Κατάθεση</p>
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl">Σύνοψη:</h3>
        <p>{plan == "monthly" ? "19€ / μήνα" : "179€ / χρόνο"}</p>
      </div>
      <div>
        {paymentForm == "card" ? (
          <button className="bg-accent hover:scale-105 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded transition ease-in-out relative group overflow-hidden flex">
            Ολοκλήρωση Πληρωμής
          </button>
        ) : (
          <>
            <p>
              Κάντε την κατάθεση στον κατώθι λογαριασμό και θα ενεργοποιήσουμε
              χειροκίνητα το μαζαζί σας εντός 1-2 εργάσιμων
            </p>
            <p>IBAN: GR1001101780000017801078241</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChoosePlans;
