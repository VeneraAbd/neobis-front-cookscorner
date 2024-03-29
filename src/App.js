import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, Fragment, } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import SearchPage from "./pages/SearchPage/SearchPage";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "./store/reducers/auth";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
      <Routes>
        <Route
          path="/login"
          element={
            showSplash ? <SplashScreen /> : <LoginPage />
          }
        />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="recipe-details" element={<RecipeDetails/>}/>
        </Route>
      </Routes>
  );
}

export default App;

