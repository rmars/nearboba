import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Boba via the main App", () => {
  render(<App />);
  const linkElement = screen.getByText(/NearBoba/i);
  expect(linkElement).toBeInTheDocument();
});
