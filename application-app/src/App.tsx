import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/Application/HomePage";
import { useEffect, useState } from "react";
import type { ApplicationType } from "./Types/ApplicationType";
import { getAll, setToken } from "./Services/requests";
import { dateConvert } from "./Services/dateConvert";
import { LoginPage } from "./Components/Login/LoginPage";
import type { UserType } from "./Types/UserType";
import { useNavigate } from "react-router-dom";

// App is the root route component. It restores the session from localStorage,
// loads the current user's applications, and routes between the dashboard and login screen.
function App() {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  // On first render, check whether a logged-in user exists and fetch that user's application list.
  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      setToken(user.token);
      console.log(`user:${user.username}, token:${user.token}`);

      getAll()
        .then((data) => {
          data = dateConvert(data);
          console.log(data);
          setApplications(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            applications={applications}
            setApplications={setApplications}
            user={user}
            setUser={setUser}
          />
        }
      />
      <Route
        path="/login"
        element={<LoginPage setUser={setUser} user={user} />}
      />
    </Routes>
  );
}

export default App;
