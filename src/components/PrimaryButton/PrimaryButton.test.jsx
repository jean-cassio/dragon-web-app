import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from ".";

describe("PrimaryButton component", () => {
  it("renders the button with children text", () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies custom style variables", () => {
    render(
      <PrimaryButton
        maxWidth="200px"
        borderColor="red"
        borderHoverColor="blue"
        bgColor="green"
        color="black"
      >
        Test Button
      </PrimaryButton>
    );

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toHaveStyle({
      "--max-width": "200px",
      "--border-color": "red",
      "--border-hover-color": "blue",
      "--bg-color": "green",
      "--color": "black",
    });
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>);

    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
