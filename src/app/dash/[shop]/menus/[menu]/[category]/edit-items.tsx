"use client";
import { FC, useEffect, useState } from "react";
import GridIcon from "@/icons/grid";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import TrashIcon from "@/icons/trash";
import { useEditItemsState } from "./edit-items-state";
import UploadIcon from "@/icons/upload";
import NotesIcon from "@/icons/notes";

const AddItems: FC = () => {
  const { items, addItem } = useEditItemsState();

  return (
    <div>
      <h1 className="text-xl">
        &#8594; Εισάγετε τα προιόντα αυτής της κατηγορίας:
      </h1>
      <div
        className="flex flex-col relative overflow-hidden"
        style={{
          height: items.reduce((a, b) => a + b.height, 0) + 40,
          transition: "height 0.5s ease-in-out",
        }}
      >
        {items.map((_, i) => (
          <Item key={i} index={i} />
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem();
          }}
          className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out mt-auto mx-auto z-10"
        >
          Προσθήκη Προιόντος
        </button>
      </div>
    </div>
  );
};

export default AddItems;

interface ItemProps {
  index: number;
}

const Item: FC<ItemProps> = ({ index }) => {
  const {
    reOrder,
    items,
    dragging,
    drag,
    deleteItem,
    editItemName,
    supported_languages,
    editItemPrice,
  } = useEditItemsState();
  const { item_order, name, price } = items[index];
  const dragged = dragging ? dragging.oldOrder === item_order : false;
  const [top, setTop] = useState(
    items
      .filter((e) => e.item_order < item_order)
      .reduce((a, b) => a + b.height, 0)
  );

  // Mouse Move
  useEffect(() => {
    if (dragged) {
      function onMouseMove(e: MouseEvent) {
        if (dragged) {
          setTop((old) => old + e.movementY);
          let current = 0;
          for (let i = 0; i < items.length; i++) {
            current += items[i].height / 2;
            if (current > top) {
              drag(item_order, i);
              console.log(dragging);

              return;
            }
            current += items[i].height / 2;
          }
        }
      }

      document.addEventListener("mousemove", onMouseMove);

      return () => document.removeEventListener("mousemove", onMouseMove);
    }
  }, [dragged, top, drag, items, item_order, dragging]);

  // Mouse up
  useEffect(() => {
    function onMouseUp() {
      if (dragged) {
        reOrder(dragging!.oldOrder, dragging!.newOrder);
      }
    }

    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [dragged, top, item_order, items, reOrder, dragging]);

  // Calculate top
  useEffect(() => {
    if (dragged) return;

    let topToBeAssigned = items
      .filter((e) => e.item_order < item_order)
      .reduce((a, b) => a + b.height, 0);
    if (dragging) {
      if (dragging.newOrder >= item_order && item_order > dragging.oldOrder) {
        topToBeAssigned -= items.find(
          (e) => e.item_order == dragging.oldOrder
        )!.height;
      } else if (
        dragging.newOrder <= item_order &&
        item_order < dragging.oldOrder
      ) {
        topToBeAssigned += items.find(
          (e) => e.item_order == dragging.oldOrder
        )!.height;
      }
    }
    setTop(topToBeAssigned);
  }, [item_order, setTop, dragged, dragging, items]);

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
        <h2 className="text-lg">&#8658; Εισάγετε το όνομα του προϊόντος:</h2>
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
                editItemName(item_order, symbol, e.target.value);
              }}
            />
          </div>
        ))}
        <div>
          <label>Τιμή</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="link"
            type="number"
            placeholder="€"
            value={price}
            required={true}
            onSubmit={(e) => e.preventDefault()}
            onChange={(e) => {
              e.preventDefault();
              editItemPrice(item_order, e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2 flex-row pt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="border border-gray-500 flex flex-row gap-2 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out ml-auto"
          >
            <UploadIcon width={20} className="my-auto" />
            Ανεβάστε φωτογραφία
          </button>
          <button className="border border-gray-500 flex flex-row gap-2 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out mr-auto">
            <NotesIcon width={20} className="my-auto" />
            Προσθέστε περιγραφή
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-auto">
        <button
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            e.preventDefault();
            console.log("mouse down");
            drag(item_order, item_order);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            console.log("touch start");
            drag(item_order, item_order);
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

            deleteItem(item_order);
          }}
          className={`my-auto cursor-pointer text-gray-400 hover:text-gray-700 transition-all ease-in-out`}
        >
          <TrashIcon width={20} />
        </button>
      </div>
    </div>
  );
};
