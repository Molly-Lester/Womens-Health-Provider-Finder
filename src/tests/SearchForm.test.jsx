import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import SearchForm from "../components/SearchForm";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

function renderSearchForm() {
  return render(
    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <SearchForm onSearch={vi.fn()} setLoading={vi.fn()} />
      </MantineProvider>
    </BrowserRouter>
  );
}

test("renders the search form heading", () => {
  renderSearchForm();

  expect(
    screen.getByText("Women's Health Clinic Finder")
  ).toBeInTheDocument();
});

test("renders the postcode input", () => {
  renderSearchForm();

  expect(
    screen.getByPlaceholderText("Enter your postcode")
  ).toBeInTheDocument();
});

test("shows postcode and category errors when search is clicked without required fields", () => {
  renderSearchForm();

  fireEvent.click(screen.getByText("Find My Best Matches"));

  expect(
    screen.getByText("Please enter a postcode to continue.")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Please select a category.")
  ).toBeInTheDocument();
});