import { render, screen } from "@testing-library/react";
import PageHeader from ".";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("PageHeader component", () => {
  const props = {
    title: "Dashboard",
    buttonText: "Create",
    route: "/create",
  };

  it("renders the title", () => {
    render(<PageHeader {...props} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the button with correct text", () => {
    render(<PageHeader {...props} />);
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("renders a link with the correct href", () => {
    render(<PageHeader {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/create");
  });
});
