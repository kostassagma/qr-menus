"use client"
import { useSearchParams } from "next/navigation";
import { FC } from "react";

const ContactForm: FC = () => {
  const searchParams = useSearchParams();
  const subjectFromParams = searchParams.get("subject");

  return (
    <form
      className="p-10 bg-gray-200 rounded-lg overflow-hidden max-w-5xl gap-3 flex flex-col w-full mx-auto"
      autoComplete="on"
    >
      <h1 className="text-2xl font-bold">Επικοινωνία</h1>
      <div>
        <label>Ονοματεπώνυμο:</label>
        <input
          className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
          id="fname"
          type="text"
          name="fname"
          placeholder="Κωνσταντίνος Σαγματόπουλος"
          required={true}
          autoComplete="name"
        />
      </div>
      <div>
        <label>Email επικοινωνίας:</label>
        <input
          className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
          id="email"
          type="email"
          name="email"
          placeholder="email@example.com"
          autoComplete="email"
          required={true}
        />
      </div>
      <div>
        <label>Όνομα μαγαζιού</label>
        <input
          className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
          id="shop-name"
          type="text"
          name="shop-name"
          placeholder="McDonalds Αγία Παρασκευή"
          required={true}
        />
      </div>
      <div>
        <label>Θέμα</label>
        <input
          className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
          id="subject"
          type="text"
          name="subject"
          placeholder="Θέμα"
          required={true}
          defaultValue={(() => {
            switch (subjectFromParams) {
              case "photo":
                // code block
                return "Φωτογράφιση";
              case "request-custom":
                return "Προσωποποιημένο μενού";
              default:
                return "";
              // code block
            }
          })()}
        />
      </div>
      <div>
        <label>Λεπτομέρειες</label>
        <textarea
          name="details"
          className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
        />
      </div>
      <button
        className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-[1.01] transition ease-in-out w-full"
        type="submit"
      >
        Αποστολή
      </button>
    </form>
  );
};

export default ContactForm;
