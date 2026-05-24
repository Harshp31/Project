import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { AppProvider } from "../../context/AppContext";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
global.localStorage = localStorageMock;

describe("Home Page and RoleSelector Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  const renderHome = () => {
    return render(
      <AppProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AppProvider>
    );
  };

  it("should render the main hero section, badge, and key features", () => {
    renderHome();

    // Check Hero badge text
    expect(screen.getByText("AI-Powered Interview Practice")).toBeInTheDocument();

    // Check Main Heading
    expect(screen.getByText("Land Your Dream")).toBeInTheDocument();
    expect(screen.getByText("Dev Job")).toBeInTheDocument();

    // Check Features list
    expect(screen.getByText("AI Generated")).toBeInTheDocument();
    expect(screen.getByText("Timed Sessions")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("3 Roles")).toBeInTheDocument();
  });

  it("should render the starting button as disabled by default until a role is selected", () => {
    renderHome();

    // The starting button should show disabled text
    const startBtn = screen.getByRole("button", { name: /Select a role above to begin/i });
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toBeDisabled();
  });

  it("should select a role card, enable the start button, and configure settings", async () => {
    renderHome();

    // 1. Select the Frontend Developer role
    const frontendCard = screen.getByRole("button", { name: /Frontend Developer/i });
    expect(frontendCard).toBeInTheDocument();
    
    fireEvent.click(frontendCard);

    // Verify the card visual indicators reflect selection (e.g. Selected ✓)
    expect(screen.getByText("Selected ✓")).toBeInTheDocument();

    // 2. The start button should now be enabled and display standard start text
    const activeStartBtn = screen.getByRole("button", { name: /Start Practice Session/i });
    expect(activeStartBtn).toBeInTheDocument();
    expect(activeStartBtn).not.toBeDisabled();

    // 3. Change difficulty to Hard
    const hardBtn = screen.getByRole("button", { name: /Hard/i });
    expect(hardBtn).toBeInTheDocument();
    fireEvent.click(hardBtn);

    // 4. Change question type to Coding Challenge
    const codingBtn = screen.getByRole("button", { name: /Coding Challenge/i });
    expect(codingBtn).toBeInTheDocument();
    fireEvent.click(codingBtn);

    // 5. Click the start button and verify navigation occurred
    fireEvent.click(activeStartBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/interview");
  });
});
