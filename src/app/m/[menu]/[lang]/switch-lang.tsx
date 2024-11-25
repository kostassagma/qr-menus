"use client";
import { FC, useEffect } from "react";
import Link from "next/link";
import LangsIcon from "@/icons/langs";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { useSwitchLangState } from "./switch-lang-state";
import CloseIcon from "@/icons/close";
import { useRouter } from "next/navigation";

interface Props {
  supported_languages: string[];
  pathname: string;
  current: string;
}

const SwitchLang: FC<Props> = ({ supported_languages, pathname, current }) => {
  const { switching, setSwitching } = useSwitchLangState();
  const router = useRouter();

  useEffect(() => {
    setSwitching(false);
  }, [router]);

  return (
    <>
      {switching && (
        <>
          <div className="h-screen w-screen z-40 backdrop-blur-md top-0 left-0 absolute" />
          <div className="p-16 rounded-lg bg-neutral-50 top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl">
            <div className="flex flex-col gap-0.5">
              <button
                className="top-2 right-2 absolute"
                onClick={(e) => {
                  e.preventDefault();
                  setSwitching(false);
                }}
              >
                <CloseIcon className="w-10" />
              </button>
              <LangsIcon className="w-10 mx-auto" />
              {supported_languages.map((lang) => (
                <Link
                  key={lang}
                  href={`/m/${pathname}/${lang}`}
                  className={`mx-auto ${
                    current == lang ? "bg-gray-200" : "bg-transparent"
                  } px-3 rounded-lg`}
                >
                  {SUPPORTED_LANGUAGES.find((e) => e.symbol == lang)!.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SwitchLang;
