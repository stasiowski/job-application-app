import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ApplicationForm } from "./ApplicationForm";

describe("ApplicationForm", () => {
  it("toggles the application fields when its button is clicked", async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add Application" }));
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add Application" }));
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();
  });
});
