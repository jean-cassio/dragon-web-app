import { render, screen } from "@testing-library/react";
import Textarea from ".";

describe("Textarea component", () => {
  it("renders the textarea with the correct placeholder", () => {
    render(<Textarea placeholder="Type here..." />);

    const textarea = screen.getByPlaceholderText("Type here...");
    expect(textarea).toBeInTheDocument();
  });

  it("renders the textarea with the correct label", () => {
    render(<Textarea id="test-id" label="Test Label" />);

    const label = screen.getByLabelText("Test Label");
    expect(label).toBeInTheDocument();
  });

  it("does not render a label when the label prop is not provided", () => {
    render(<Textarea id="test-id" />);

    const label = screen.queryByLabelText("Test Label");
    expect(label).not.toBeInTheDocument();
  });

  it("applies custom maxWidth and minHeight styles", () => {
    const { container } = render(
      <Textarea id="test-id" maxWidth="300px" minHeight="150px" />
    );

    const textareaContainer = container.querySelector("div");

    expect(textareaContainer).toHaveStyle("--max-width: 300px");
    expect(textareaContainer).toHaveStyle("--min-height: 150px");
  });
});
