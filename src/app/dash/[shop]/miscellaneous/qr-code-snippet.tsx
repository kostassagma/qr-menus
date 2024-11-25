"use client";
import React, { FC, useState } from "react";
import { QRCode } from "react-qrcode-logo";

interface Props {
  link: string;
}

const QrCodeSnippet: FC<Props> = ({ link }) => {
  const [qrStyle, setQrStyle] = useState<"dots" | "fluid" | "squares">("dots");

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

  return (
    <div className="flex flex-col w-full">
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
        />
      </div>
      <button
        className="mx-auto p-2 border border-black rounded hover:scale-105 transition ease-in-out"
        onClick={() => downloadCode()}
      >
        Λήψη ώς εικόνα
      </button>
    </div>
  );
};

export default QrCodeSnippet;
