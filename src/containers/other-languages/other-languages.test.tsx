import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OtherLanguages from "./other-languages";
import { OTHER_LANGUAGES } from "../../constants/app-constants";


it("renders all languages from OTHER_LANGUAGES", () => {
  render(<OtherLanguages />);


  OTHER_LANGUAGES.SYMBOLS.forEach((lang) => {
    expect(screen.getByText(lang)).toBeInTheDocument();
  });
});
