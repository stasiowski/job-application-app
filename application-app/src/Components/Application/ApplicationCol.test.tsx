import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApplicationCol } from "./ApplicationCol";
import type { ApplicationType } from "../../Types/ApplicationType";
import { remove } from "../../Services/requests";
import type { StatusesType } from "../../Types/StatusesType";

vi.mock("../../Services/requests", () => ({
  remove: vi.fn(),
}));

const applications: ApplicationType[] = [
  {
    id: "applied-1",
    title: "Frontend Engineer",
    company: "Acme",
    location: "Remote",
    status: "Applied",
    date: new Date("2025-01-15T12:00:00.000Z"),
  },
  {
    id: "saved-1",
    title: "Product Designer",
    company: "Example Co",
    location: "New York",
    status: "Saved",
    date: new Date("2025-01-16T12:00:00.000Z"),
  },
];

const statuses: StatusesType = {
  Saved: true,
  Applied: true,
  Interview: true,
  Offered: true,
  Rejected: true,
};

function ApplicationColHarness() {
  const [currentApplications, setApplications] = useState(applications);

  return (
    <>
      <ApplicationCol
        applications={currentApplications}
        setApplications={setApplications}
        status="Applied"
        statuses={statuses}
        setStatuses={vi.fn()}
      />
      <ApplicationCol
        applications={currentApplications}
        setApplications={setApplications}
        status="Saved"
        statuses={statuses}
        setStatuses={vi.fn()}
      />
    </>
  );
}

describe("ApplicationCol", () => {
  beforeEach(() => {
    vi.mocked(remove).mockResolvedValue(undefined);
  });

  it("shows only applications matching its status", () => {
    render(<ApplicationColHarness />);

    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Designer")).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("removes an application from the service and the rendered list", async () => {
    const user = userEvent.setup();
    render(<ApplicationColHarness />);

    const card = screen.getByText("Frontend Engineer").closest("li");
    const menuToggle = card?.querySelector("div.rounded-full");
    expect(menuToggle).not.toBeNull();

    await user.click(menuToggle!);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(remove).toHaveBeenCalledWith("applied-1");
      expect(screen.queryByText("Frontend Engineer")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Product Designer")).toBeInTheDocument();
  });
});
