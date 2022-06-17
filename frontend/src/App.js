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
import loader from './Assets/images/loader.gif'
import BlogDetails from "./components/BlogPage/BlogDetails/BlogDetails";
import PrivateRoute from "./components/AuthComponents/PrivateRoute/PrivateRoute";
import AddBlog from "./components/BlogPage/AddBlog/AddBlog";
import Dashboard from "./components/DashboardComponents/Dashboard/Dashboard";
import AppSidebar from "./components/DashboardComponents/AppSidebar/AppSidebar";
import MyBlogs from "./components/DashboardComponents/MyBlogs/MyBlogs";

export const AuthContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const authToken = localStorage.getItem('auth-token')

  useEffect(() => {
    if (authToken != "") {
      fetch("http://localhost:5000/auth/me", {
        headers: {
          'auth-token': authToken
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
                  <Route path="/career" element={<Career />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="/abc" element={<AppSidebar />} />
                </Route>

                {/* for only admin */}
                <Route element={<PrivateRoute isAdmin={true} />}>

                </Route>

                <Route exact path="/dashboard">
                  <Route path="" element={<Dashboard />} />
                  <Route path="add-blog" element={<AddBlog />} />
                  <Route path="my-blogs" element={<MyBlogs />} />
                  <Route path="*" element={<AddBlog />} />
                </Route>

              </Routes>
            </>
          )
            :
            (
              <div className={`d-flex justify-content-center align-items-center`} styles={{ height: '100vh' }} >
                <img width="200px" src={loader} />
              </div>
            )
        }
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
