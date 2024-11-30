"use client";
import ClipBoardIcon from "@/icons/clipboard";
import ClipBoardCheckIcon from "@/icons/clipboard-check";
import { HOSTNAME } from "@/utils/constants";
import Link from "next/link";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { QRCode } from "react-qrcode-logo";

interface Props {
  link: string;
}

const QrCodeSnippet: FC<Props> = ({ link }) => {
  const [qrStyle, setQrStyle] = useState<"dots" | "fluid" | "squares">("dots");
  const [copied, setCopied] = useState(false);

  const downloadCode = () => {
    const canvas = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        //@ts-expect-error canvas is retrieved with getElementById
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `barcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const onStyleChange = () => {
    setQrStyle((old) => {
      if (old == "dots") {
        return "fluid";
      } else if (old == "fluid") {
        return "squares";
      } else {
        return "dots";
      }
    });
  };

  const copyMenuLink = async () => {
    const elem = document.createElement("textarea");
    elem.value = `${HOSTNAME}${link}`;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    setCopied(true);
    toast("Ο σύνδεσμος του μενού αντιγράφθηκε στο πρόχειρο!");
    setTimeout(() => {
      setCopied(false);
    }, 4 * 1000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row rounded w-full border border-gray-600">
        <Link
          className="p-2 overflow-hidden hover:underline"
          target="_blank"
          href={link}
        >
          {link}
        </Link>
        <div className="flex-1" />
        <button
          onClick={(e) => {
            e.preventDefault();
            copyMenuLink();
          }}
          className="aspect-square h-full flex hover:bg-gray-100 rounded p-2"
        >
          {copied ? (
            <ClipBoardCheckIcon width={22} className="m-auto" />
          ) : (
            <ClipBoardIcon width={22} className="m-auto" />
          )}
        </button>
      </div>
      <div
        className="mx-auto"
        onClick={(e) => {
          e.preventDefault();
          onStyleChange();
        }}
      >
        <QRCode
          value={link} // here you should keep the link/value(string) for which you are generation promocode
          size={256} // the dimension of the QR code (number)
          // logoImage="https://ionicframework.com/docs/icons/logo-react-icon.png" // URL of the logo you want to use, make sure it is a dynamic url
          logoHeight={40}
          logoWidth={40}
          logoOpacity={1}
          enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
          qrStyle={qrStyle} // type of qr code, wether you want dotted ones or the square ones
          eyeRadius={10} // radius of the promocode eye
          id={"QR"}
          bgColor="#cbd4e1"
        />
      </div>
      <button
        className="mx-auto p-2 border bg-accent text-white rounded hover:scale-105 transition ease-in-out"
        onClick={() => downloadCode()}
      >
        Λήψη ώς εικόνα
      </button>
    </div>
  );
};

export default QrCodeSnippet;
