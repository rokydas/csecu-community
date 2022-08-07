import { createContext, useEffect, useState } from "react";
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
import BlogDetails from "./components/BlogPage/BlogDetails/BlogDetails";
import PrivateRoute from "./components/AuthComponents/PrivateRoute/PrivateRoute";
import AddBlog from "./components/DashboardComponents/AddBlog/AddBlog";
import Dashboard from "./components/DashboardComponents/Dashboard/Dashboard";
import AppSidebar from "./components/DashboardComponents/AppSidebar/AppSidebar";
import MyBlogs from "./components/DashboardComponents/MyBlogs/MyBlogs";
import EditBlog from "./components/DashboardComponents/EditBlog/EditBlog";
import ArrangeWorkshop from "./components/DashboardComponents/ArrangeWorkshop/ArrangeWorkshop";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import PeopleSection from "./components/PeoplePage/PleopleSection/PeopleSection";
import AddResearch from "./components/DashboardComponents/AddResearch/AddResearch";
import ResearchDetails from "./components/ResearchPage/ResearchDetails/ResearchDetails";
import Review from "./components/ReviewPage/Review/Review";
import UpdateProfile from "./components/UpdateProfileComponents/UpdateProfile/UpdateProfile";
import Workshops from "./components/WorkshopPage/Workshops/Workshops";
import ManageWorkshop from "./components/DashboardComponents/ManageWorkshop/ManageWorkshop";
import './CommonStyles/style.scss'
import Loader from "./components/CommonComponents/Loader/Loader";

export const AuthContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const authToken = localStorage.getItem('auth-token')

  useEffect(() => {
    if (authToken != "") {
      fetch("https://csecu-community.herokuapp.com/auth/me", {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setLoggedInUser(data.user)
          }
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
    else {
      setLoggedInUser({})
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          {
            !isLoading ? (
              <>
                <AddressBar />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home isLoading={isLoading} setIsLoading={setIsLoading} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} />

                  {/* for all authenticated users */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<ProfileSection />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/research" element={<ResearchPage />} />
                    <Route path="/research/:id" element={<ResearchDetails />} />
                    <Route path="/review/:id" element={<Review />} />
                    <Route path="/workshop" element={<Workshops />} />
                    <Route path="/career" element={<Career />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="/people" element={<PeopleSection />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                  </Route>

                  {/* for only admin */}
                  <Route element={<PrivateRoute isAdmin={true} />}>

                  </Route>

                  <Route exact path="/dashboard">
                    <Route path="" element={<Dashboard />} />
                    <Route path="add-blog" element={<AddBlog />} />
                    <Route path="edit-blog/:id" element={<EditBlog />} />
                    <Route path="my-blogs" element={<MyBlogs />} />
                    <Route path="arrange-workshop" element={<ArrangeWorkshop />} />
                    <Route path="manage-workshop" element={<ManageWorkshop />} />
                    <Route path="add-research" element={<AddResearch />} />
                  </Route>

                </Routes>
              </>
            )
              :
              <Loader />
          }
        </BrowserRouter>
      </LocalizationProvider>
    </AuthContext.Provider>
  );
}

export default App;
