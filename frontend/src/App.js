import { createContext, useState } from "react";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Login from "./components/AuthComponents/Login/Login";
import Register from "./components/AuthComponents/Register/Register";
import Blogs from "./components/BlogPage/Blogs/Blogs";
import Career from "./components/CareerPage/Career";
import AddressBar from "./components/CommonComponents/AddressBar/AddressBar";
import Navbar from './components/CommonComponents/Navbar/Navbar';
import Home from './components/HomeComponents/Home/Home';
import ResearchPage from "./components/ResearchPage/ResearchPage";
import ProfileSection from "./components/UserProfileComponents/ProfileSection/ProfileSection";

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
          <Route path="/profile" element={<ProfileSection/>}/>
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/research" element={<ResearchPage/>}/>
          <Route path="/career" element={<Career/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
