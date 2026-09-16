import ThemeProvider from "../providers/ThemeProvider";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function TestProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function renderWithProviders(ui, options) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: TestProviders, ...options }),
  };
}

export * from "@testing-library/react";
export { renderWithProviders };
