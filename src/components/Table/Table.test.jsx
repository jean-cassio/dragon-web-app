import { render, screen } from "@testing-library/react";
import Table from ".";

describe("Table component", () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
  ];

  const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ];

  it("renders the correct headers", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders the correct data", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders data using renderCell if provided", () => {
    const customRenderCell = (value, key) => {
      if (key === "age") return `Age: ${value}`;
      return value;
    };

    render(
      <Table columns={columns} data={data} renderCell={customRenderCell} />
    );

    expect(screen.getByText("Age: 30")).toBeInTheDocument();
    expect(screen.getByText("Age: 25")).toBeInTheDocument();
  });
});
