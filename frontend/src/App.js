import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomeComponents/Home/Home';
import Navbar from './components/CommonComponents/Navbar/Navbar';
import AddressBar from "./components/CommonComponents/AddressBar/AddressBar";
import Login from "./components/AuthComponents/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <AddressBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
