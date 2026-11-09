import { useEffect, useState } from "react";
import { login, register } from "../../Services/requests";
import { setToken } from "../../Services/requests";
import type { UserType } from "../../Types/UserType";
import { useNavigate } from "react-router-dom";

type LoginPageProps = {
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  user: UserType;
};

export function LoginPage({ setUser, user }: LoginPageProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  async function handleLogin(username: string, password: string) {
    const user = await login({ username, password });
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(user.token);
    setUser(user);
    navigate("/");
  }

  async function handleRegister(username: string, password: string) {
    const newUser = await register({ username, password });
    await handleLogin(username, password);
    console.log(newUser);
    navigate("/");
  }

  return (
    <div className="p-6 relative min-h-screen font-Inter flex flex-col justify-center items-center gap-4 bg-slate-100 text-slate-900">
      <div className="flex justify-around w-full mb-36">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-2xl">Login</span>
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-96">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                handleLogin(username, password);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Log In
            </button>
          </div>
          <span>
            Need an account?
            <a
              onClick={() => {
                setShowSignUp(true);
              }}
              className="text-blue-500 cursor-pointer"
            >
              {" "}
              Sign Up!
            </a>
          </span>
        </div>
        {showSignUp && (
          <div className="flex flex-col gap-3 items-center">
            <span className="text-2xl">Sign Up</span>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-96">
              <input
                onChange={(e) => setRegisterUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                onChange={(e) => setRegisterPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  handleRegister(registerUsername, registerPassword);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
