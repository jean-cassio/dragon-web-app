import { render, screen } from "@testing-library/react";
import PrivateRoute from ".";
import useAuth from "@/hooks/useAuth";

jest.mock("react-router-dom", () => ({
  Navigate: ({ to }) => <div>Redirected to {to}</div>,
}));

jest.mock("@/hooks/useAuth", () => jest.fn());

describe("PrivateRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /login when user is not authenticated", () => {
    useAuth.mockReturnValue({ user: {}, loading: false });

    render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(screen.getByText("Redirected to /login")).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    useAuth.mockReturnValue({ user: { name: "me" }, loading: false });

    render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("renders nothing when loading is true", () => {
    useAuth.mockReturnValue({ user: {}, loading: true });

    const { container } = render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
