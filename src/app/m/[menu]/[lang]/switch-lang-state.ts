import { create } from "zustand";

interface SwitchLangsType {
  switching: boolean;
  setSwitching: (newValue: boolean | ((oldValue: boolean) => boolean)) => void;
}

export const useSwitchLangState = create<SwitchLangsType>()((set) => ({
  switching: false,
  setSwitching: (newValue: boolean | ((oldValue: boolean) => boolean)) => {
    if (typeof newValue == "boolean") {
      set({ switching: newValue });
    } else {
      set((state) => ({ switching: newValue(state.switching) }));
    }
  },
}));
