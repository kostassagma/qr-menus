"use client";

import { revalidateMenuPage } from "@/utils/revalidate/revalidate-page";
import { createBrowserClient } from "@/utils/supabase/client";
import { FC, useEffect, useState } from "react";

interface Props {
  initialValue: boolean;
  itemId: number;
  menuPathname: string;
}

const EditAvailability: FC<Props> = ({ initialValue, itemId }) => {
  const [available, setAvailable] = useState(initialValue);

  useEffect(() => {
    (async () => {
      const supabase = createBrowserClient();

      await supabase.from("items").update({ available }).eq("id", itemId);

      await revalidateMenuPage();
    })();
  }, [available, itemId]);

  return (
    <div className="flex flex-row">
      <label className="inline-flex items-center cursor-pointer">
        <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {available ? "Διαθέσιμο" : "Μη Διαθέσιμο"}
        </span>
        <input
          checked={available}
          type="checkbox"
          onClick={(e) => {
            e.preventDefault();
            setAvailable((old) => !old);
          }}
          onChange={(e) => e.preventDefault()}
          className="sr-only peer"
        />
        <div
          className={`relative w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
            peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer
            ${
              available
                ? "after:bg-accent after:translate-x-full after:border-white bg-blue-200"
                : "after:bg-white"
            }
            `}
        ></div>
      </label>
    </div>
  );
};

export default EditAvailability;
