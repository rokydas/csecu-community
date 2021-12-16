import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/HomeComponents/Home/Home';
import Navbar from './components/CommonComponents/Navbar/Navbar';
import AddressBar from "./components/CommonComponents/AddressBar/AddressBar";

function App() {
  return (
    <BrowserRouter>
      <AddressBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
