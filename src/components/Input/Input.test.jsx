import { render, screen, fireEvent } from "@testing-library/react";
import Input from ".";

describe("Input component", () => {
  it("renders the input element", () => {
    render(<Input id="test-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders the placeholder text", () => {
    render(<Input id="input1" placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<Input id="input2" label="Name" />);
    const label = screen.getByText("Name");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", "input2");
  });

  it("does not render a label when label prop is empty", () => {
    render(<Input id="input3" />);
    const label = screen.queryByLabelText("input3");
    expect(label).not.toBeInTheDocument();
  });

  it("applies custom maxWidth as inline style", () => {
    render(<Input id="input4" maxWidth="300px" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(wrapper).toHaveStyle({ "--max-width": "300px" });
  });

  it("passes additional props to input", () => {
    const handleChange = jest.fn();
    render(
      <Input
        id="input5"
        type="email"
        value="test@example.com"
        onChange={handleChange}
      />
    );

    const input = screen.getByDisplayValue("test@example.com");
    expect(input).toHaveAttribute("type", "email");

    fireEvent.change(input, { target: { value: "new@example.com" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
