"use client";
import CloseIcon from "@/icons/close";
import CloudUploadIcon from "@/icons/cloud-upload";
import { Dispatch, FC, SetStateAction, useState } from "react";

const UploadImages: FC = () => {
  const [icon, setIcon] = useState<string>("");
  const [shopImg, setShopImg] = useState<string>("");

  return (
    <div>
      <h1 className="text-xl">
        &#8594; Τέλος, ανεβάστε φωτογραφίες του μαγαζιού:
      </h1>
      <div className="flex flex-col md:flex-row gap-3">
        <UploadWidget file={icon} setFile={setIcon} name="shop_icon" />
        <UploadWidget file={shopImg} setFile={setShopImg} name="shop_image" />
      </div>
    </div>
  );
};

export default UploadImages;

interface UploadWidgetProps {
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  name: string;
}

const UploadWidget: FC<UploadWidgetProps> = ({ file, setFile, name }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(""); // Clear the file URL
  };

  return (
    <div className="flex flex-col z-[60] bg-white rounded p-5 shadow-lg flex-1">
      <label className="mb-1 flex">
        {name === "shop_icon" ? (
          <>
            Επιλέξτε το <p className="font-bold mx-1">εικονίδιο</p> του μαγαζιού
          </>
        ) : (
          <>
            Επιλέξτε την <p className="font-bold mx-1">εικόνα</p> του μαγαζιού
          </>
        )}
      </label>
      <div
        className="w-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="flex flex-col justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex overflow-hidden">
            {file ? (
              <div className="relative w-full h-full">
                <img
                  src={file}
                  alt={`${name} preview`}
                  className="h-full object-contain m-auto"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 text-black rounded-full p-1 hover:bg-red-600 hover:text-white hover:rotate-180 transition-all ease-in-out"
                  aria-label="Remove file"
                >
                  <CloseIcon width={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-1 m-auto">
                <CloudUploadIcon className="w-6 h-6 text-gray-600" />
                {isDragging ? (
                  <span className="font-medium text-gray-600">
                    Drop to Upload
                  </span>
                ) : (
                  <span className="font-medium text-gray-600">
                    Drag and Drop files to Attach, or{" "}
                    <span className="text-blue-600 underline">browse</span>:
                  </span>
                )}
              </div>
            )}
          </span>
          <input
            type="file"
            name={name}
            accept="image/png, image/gif, image/jpeg, image/jpg"
            hidden
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};
