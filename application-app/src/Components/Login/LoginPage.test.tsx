import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "./LoginPage";
import { login, register, setToken } from "../../Services/requests";
import type { UserType } from "../../Types/UserType";

vi.mock("../../Services/requests", () => ({
  login: vi.fn(),
  register: vi.fn(),
  setToken: vi.fn(),
}));

const user: Exclude<UserType, null> = {
  username: "test-user",
  token: "test-token",
};

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(login).mockResolvedValue(user);
    vi.mocked(register).mockResolvedValue(user);
  });

  it("logs in with the entered credentials and restores the session", async () => {
    const userInteraction = userEvent.setup();
    const setUser = vi.fn();
    render(
      <MemoryRouter>
        <LoginPage setUser={setUser} user={null} />
      </MemoryRouter>,
    );

    await userInteraction.type(screen.getByPlaceholderText("Username"), "test-user");
    await userInteraction.type(screen.getByPlaceholderText("Password"), "password");
    await userInteraction.click(screen.getByRole("button", { name: "Log In" }));

    expect(login).toHaveBeenCalledWith({
      username: "test-user",
      password: "password",
    });
    expect(setToken).toHaveBeenCalledWith("test-token");
    expect(setUser).toHaveBeenCalledWith(user);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
  });

  it("reveals the sign-up form when requested", async () => {
    const userInteraction = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage setUser={vi.fn()} user={null} />
      </MemoryRouter>,
    );

    await userInteraction.click(screen.getByText("Sign Up!", { selector: "a" }));

    expect(screen.getByText("Sign Up", { selector: "span" })).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("Username")).toHaveLength(2);
  });
});
