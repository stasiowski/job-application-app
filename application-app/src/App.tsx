import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/Application/HomePage";
import { useEffect, useState } from "react";
import type { ApplicationType } from "./Types/ApplicationType";
import { getAll, setToken } from "./Services/requests";
import { dateConvert } from "./Services/dateConvert";
import { LoginPage } from "./Components/Login/LoginPage";
import type { UserType } from "./Types/UserType";

function App() {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);

  //loads notes from backend
  useEffect(() => {
    getAll()
      .then((data) => {
        data = dateConvert(data);
        console.log(data);
        setApplications(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Checks if logged in
  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      setToken(user.token);
      console.log(`user:${user.username}, token:${user.token}`);
    }
  }, []);

  return (
    <Router>
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
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
