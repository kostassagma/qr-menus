import HomeNav from "@/components/navbar/home-nav";
import BigFooter from "@/components/footer/big-footer";
import { Suspense } from "react";
import PhoneIcon from "@/icons/phone";
import MailIcon from "@/icons/mail";
import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <Suspense>
      <div className="min-h-screen flex flex-col">
        <HomeNav />
        <main className="flex-1 w-full p-10 flex">
          <div className="m-auto w-full flex flex-col gap-2">
            <Suspense>
              <ContactForm />
            </Suspense>
            <div className="flex flex-col w-full items-center">
              <p className="inline-block mr-2">Εναλλακτικά: </p>
              <div className="flex flex-row">
                <PhoneIcon height={15} className="my-auto" />
                <p>: 6970460507</p>
              </div>
              <div className="flex flex-row">
                <MailIcon height={15} className="my-auto" />
                <p>: kostassagmatopoulos@gmail.com</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BigFooter />
    </Suspense>
  );
}
