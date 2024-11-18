"use client";
import { FC, useEffect, useState } from "react";
import { useNewMenuState } from "./new-menu-state";
import GridIcon from "@/icons/grid";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import TrashIcon from "@/icons/trash";

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
  const {
    reOrder,
    categories,
    dragging,
    drag,
    deleteCategory,
    editCategoryName,
    supported_languages,
  } = useNewMenuState();
  const { order, name } = categories[index];
  const dragged = dragging ? dragging.oldOrder === order : false;
  const [top, setTop] = useState(
    categories.filter((e) => e.order < order).reduce((a, b) => a + b.height, 0)
  );

  // Mouse Move
  useEffect(() => {
    if (dragged) {
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
    }
  }, [dragged, top, drag, categories, order]);

  // Mouse up
  useEffect(() => {
    function onMouseUp() {
      if (dragged) {
        reOrder(dragging!.oldOrder, dragging!.newOrder);
      }
    }

    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [dragged, top, order, categories, reOrder, dragging]);

  // Calculate top
  useEffect(() => {
    if (dragged) return;

    let topToBeAssigned = categories
      .filter((e) => e.order < order)
      .reduce((a, b) => a + b.height, 0);
    if (dragging) {
      if (dragging.newOrder >= order && order > dragging.oldOrder) {
        topToBeAssigned -= categories.find(
          (e) => e.order == dragging.oldOrder
        )!.height;
      } else if (dragging.newOrder <= order && order < dragging.oldOrder) {
        topToBeAssigned += categories.find(
          (e) => e.order == dragging.oldOrder
        )!.height;
      }
    }
    setTop(topToBeAssigned);
  }, [order, setTop, dragged, dragging, categories]);

  return (
    <div
      className={`flex flex-row gap-2 p-2 rounded-md shadow-sm border-l-4 border-l-accent absolute w-full bg-white ${
        dragged
          ? "z-50 scale-[0.97] transition ease-in-out"
          : "transition-all ease-in-out"
      }`}
      style={{ top }}
    >
      <div className="flex-1 flex flex-col">
        <h2 className="text-lg">&#8658; Εισάγετε το όνομα της κατηγορίας:</h2>
        {supported_languages.map((symbol) => (
          <div key={symbol}>
            <label>
              {(() => {
                for (let i = 0; i < SUPPORTED_LANGUAGES.length; i++) {
                  if (SUPPORTED_LANGUAGES[i].symbol == symbol)
                    return SUPPORTED_LANGUAGES[i].label;
                }
              })()}
              :
            </label>
            <input
              value={name.filter((e) => e.locale == symbol)[0].text}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="link"
              type="text"
              name={`name-${symbol}`}
              placeholder={symbol}
              lang={symbol}
              required={true}
              onSubmit={(e) => e.preventDefault()}
              onChange={(e) => {
                e.preventDefault();
                editCategoryName(order, symbol, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 my-auto">
        <button
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            e.preventDefault();
            console.log("mouse down");
            drag(order, order);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            console.log("touch start");
            drag(order, order);
          }}
          className={`my-auto ml-auto cursor-pointer ${
            dragged ? "text-gray-700" : "text-gray-400 hover:text-gray-700"
          } transition-all ease-in-out`}
        >
          <GridIcon width={20} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(order);

            deleteCategory(order);
          }}
          className={`my-auto cursor-pointer text-gray-400 hover:text-gray-700 transition-all ease-in-out`}
        >
          <TrashIcon width={20} />
        </button>
      </div>
    </div>
  );
};
