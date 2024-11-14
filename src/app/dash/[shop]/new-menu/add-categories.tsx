"use client";
import { FC, useEffect, useState } from "react";
import { useNewMenuState } from "./new-menu-state";
import GridIcon from "@/icons/grid";

const AddCategories: FC = () => {
  const { categories, addCategory } = useNewMenuState();

  return (
    <div>
      <h1 className="text-xl">
        &#8594; Τώρα, εισάγετε τις κατηγορίες με τα αντίστοιχα προιόντα τους:
      </h1>
      <div
        className="flex flex-col relative overflow-hidden"
        style={{
          height: categories.reduce((a, b) => a + b.height, 0) + 40,
          transition: "height 0.5s ease-in-out",
        }}
      >
        {categories.map((_, i) => (
          <Category key={i} index={i} />
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            addCategory();
          }}
          className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out mt-auto mx-auto z-10"
        >
          Προσθήκη Κατηγορίας
        </button>
      </div>
    </div>
  );
};

export default AddCategories;

interface CategoryProps {
  index: number;
}

const Category: FC<CategoryProps> = ({ index }) => {
  const { reOrder, categories, dragging, drag } = useNewMenuState();
  const { order } = categories[index];
  const [dragged, setDragged] = useState(false);
  const [top, setTop] = useState(order * 50);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (dragged) {
        setTop((old) => old + e.movementY);
        let current = 0;
        for (let i = 0; i < categories.length; i++) {
          current += categories[i].height / 2;
          if (current > top) {
            drag(order, i);
            return;
          }
          current += categories[i].height / 2;
        }
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [dragged, top, drag, categories, order]);

  useEffect(() => {
    function onMouseUp() {
      if (dragged) {
        let current = 0;
        for (let i = 0; i < categories.length; i++) {
          current += categories[i].height / 2;
          if (current > top) {
            reOrder(order, i);
            setDragged(false);
            return;
          }
          current += categories[i].height / 2;
        }
        setDragged(false);
        reOrder(order, categories.length - 1);
      }
    }

    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [dragged, top, order, categories, reOrder]);

  useEffect(() => {
    if (dragged) return;

    let topToBeAssigned = 50 * order;
    if (dragging) {
      if (dragging.newOrder >= order && order > dragging.oldOrder) {
        topToBeAssigned -= 50;
      } else if (dragging.newOrder <= order && order < dragging.oldOrder) {
        topToBeAssigned += 50;
      }
    }
    setTop(topToBeAssigned);
  }, [order, setTop, dragged, dragging]);

  return (
    <div
      className={`flex flex-row gap-2 p-2 rounded-md shadow-sm border-l-4 border-l-accent absolute w-full bg-white ${
        dragged
          ? "z-50 scale-[0.97] transition ease-in-out"
          : "transition-all ease-in-out"
      }`}
      style={{ top }}
    >
      {index}:{order}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          console.log("mouse down");
          setDragged(true);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          console.log("touch start");
          setDragged(true);
        }}
        className={`my-auto ml-auto cursor-pointer ${
          dragged ? "text-gray-700" : "text-gray-400 hover:text-gray-700"
        } transition-all ease-in-out`}
      >
        <GridIcon width={20} />
      </button>
    </div>
  );
};
