import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Card component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default styles when no props are provided", () => {
    render(
      <Card>
        <span>Default Props</span>
      </Card>
    );
    const card = screen.getByText("Default Props").parentElement;

    expect(card).toHaveStyle({
      "--max-width": "30rem",
      "--border-color": "--light-gray",
      "--bg-color": "#fff",
    });
  });

  it("applies custom maxWidth, borderColor and bgColor", () => {
    render(
      <Card maxWidth="50rem" borderColor="#123456" bgColor="#f0f0f0">
        <div>Custom Styles</div>
      </Card>
    );

    const card = screen.getByText("Custom Styles").parentElement;

    expect(card).toHaveStyle({
      "--max-width": "50rem",
      "--border-color": "#123456",
      "--bg-color": "#f0f0f0",
    });
  });

  it("has the wrapper class from CSS module", () => {
    render(
      <Card>
        <div>Class Check</div>
      </Card>
    );
    const card = screen.getByText("Class Check").parentElement;

    expect(card.className).toMatch(/wrapper/);
  });
});
