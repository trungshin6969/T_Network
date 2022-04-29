import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Newsfeed from "./pages/newsFeed";
import Profile from "./pages/profile";
import ActivationEmail from "./components/ActivationEmail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/newsfeed"
              element={
                <RequireAuth>
                  <Newsfeed />
                </RequireAuth>
              }
            />

            <Route
              path="/user/:id"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            <Route
              path="/activate/:activationToken"
              element={
                <RequireAuth>
                  <ActivationEmail />
                </RequireAuth>
              }
            />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
