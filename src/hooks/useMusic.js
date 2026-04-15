import { useContext } from "react";
import { MusicContext } from "../contexts/MusicContextValue";

export const useMusic = () => {
  const contextValue = useContext(MusicContext);

  if (!contextValue) {
    throw new Error("useMusic must be used inside MusicProvider");
  }

  return contextValue;
};
