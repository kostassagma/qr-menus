"use client";
import { FC, useEffect, useState } from "react";
import "./header.css";
import Link from "next/link";

interface Props {
  categories: {
    order: number;
    label: string;
  }[];
}

const CategoriesSelector: FC<Props> = ({ categories }) => {
  const [selected, setSelected] = useState(categories[0].order);

  useEffect(() => {
    function getCategoryInView() {
      for (let i = categories.length - 1; i > -1; i = i - 1) {
        if (
          document.getElementById(categories[i].order.toString())!.getBoundingClientRect()
            .top <= 0
        ) {
          return categories[i].order;
        }
      }
      return categories[0].order;
    }

    function scrollListener(ev: Event) {
      setSelected(getCategoryInView());
    }

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div
      className="border-b border-gray-300 mx-auto w-full flex p-1 overflow-scroll gap-6 sticky top-6 z-20 max-w-4xl bg-neutral-50 pt-1.5"
      id="categories"
    >
      {categories.map(({ order, label }) =>
        order === selected ? (
          <Link
            href={`#${order}`}
            className="rounded-md px-3 py-1 text-sm font-semibold bg-gray-800 text-white whitespace-nowrap"
            key={order}
          >
            {label}
          </Link>
        ) : (
          <Link
            href={`#${order}`}
            className="rounded-md px-3 py-1 text-sm font-semibold whitespace-nowrap"
            key={order}
          >
            {label}
          </Link>
        )
      )}
    </div>
  );
};

export default CategoriesSelector;
