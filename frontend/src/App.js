import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomeComponents/Home/Home';
import Navbar from './components/CommonComponents/Navbar/Navbar';
import AddressBar from "./components/CommonComponents/AddressBar/AddressBar";
import Login from "./components/AuthComponents/Login/Login";
import Register from "./components/AuthComponents/Register/Register";
import { createContext, useState } from "react";

export const AuthContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <AddressBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
