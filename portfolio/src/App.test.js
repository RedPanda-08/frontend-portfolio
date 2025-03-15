import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom"; // Ensures Jest DOM matchers work

test("renders the Learn React link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
