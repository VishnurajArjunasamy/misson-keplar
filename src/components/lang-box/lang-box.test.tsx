import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Langbox from "./lang-box";

it("Check lang box shows text", () => {
  const lang = "E";
  render(<Langbox lang={lang} />);
  const langEle = screen.getByText(lang);
  expect(langEle).toBeInTheDocument();
  expect(langEle).toHaveTextContent(lang);
});
