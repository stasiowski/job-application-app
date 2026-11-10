import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Application } from "./Application";
import type { ApplicationType } from "../../Types/ApplicationType";

const application: ApplicationType = {
  id: "application-1",
  title: "Frontend Engineer",
  company: "Acme",
  location: "Remote",
  status: "Applied",
  date: new Date("2025-01-15T12:00:00.000Z"),
};

describe("Application", () => {
  it("renders the application details and formatted date", () => {
    render(
      <Application
        application={application}
        setApplications={vi.fn()}
        handleRemove={vi.fn()}
      />,
    );

    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText(application.date.toLocaleDateString())).toBeInTheDocument();
  });

  it("opens the delete menu and calls the removal handler", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    const { container } = render(
      <Application
        application={application}
        setApplications={vi.fn()}
        handleRemove={handleRemove}
      />,
    );
    const menuToggle = container.querySelector("li > div:last-child > div");

    expect(menuToggle).not.toBeNull();
    await user.click(menuToggle!);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleRemove).toHaveBeenCalledWith(application.id);
  });

  it("closes the delete menu after an outside click", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Application
        application={application}
        setApplications={vi.fn()}
        handleRemove={vi.fn()}
      />,
    );
    const menuToggle = container.querySelector("li > div:last-child > div");

    await user.click(menuToggle!);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
  });
});
