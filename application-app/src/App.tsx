import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/Application/HomePage";
import { useEffect, useState } from "react";
import type { ApplicationType } from "./Types/ApplicationType";
import { getAll } from "./Services/requests";
import { dateConvert } from "./Services/dateConvert";

function App() {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage applications={applications} />} />
      </Routes>
    </Router>
  );
}

export default App;
