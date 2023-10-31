import { Berkshire_Swash, Cabin_Condensed } from "next/font/google";

export const displayFont = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

export const textFont = Cabin_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});
