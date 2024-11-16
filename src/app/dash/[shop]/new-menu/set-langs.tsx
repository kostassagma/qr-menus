"use client";
import { FC, useEffect } from "react";
import { useAuthState } from "../../auth-state";
import { useNewMenuState } from "./new-menu-state";

interface Props {
  shop: string;
}

const SetLangs: FC<Props> = ({ shop }) => {
  const { shops } = useAuthState();
  const { setSupportedLanguages, supported_languages } = useNewMenuState();

  console.log(supported_languages);

  useEffect(() => {
    if (!shops) return;
    const shopDetails = shops!.find((e) => e.pathname === shop);
    setSupportedLanguages(shopDetails!.supported_languages);
  }, [shops, shop, setSupportedLanguages]);

  return <></>;
};

export default SetLangs;
