import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GuestWelcome from "./pages/GuestWelcome";
import HostWelcome from "./pages/HostWelcome";
import LeadingPage from "./pages/LeadingPage";
import ConfirmReservation from "./pages/ConfirmReservation";
import MyListings from "./pages/MyListings";
import GuestSignupPage from "./pages/GuestSignupPage";
import SignInPage from "./pages/SignInPage";
import HostSignupPage from "./pages/HostSignupPage";
import MyPastReservations from "./pages/MyPastReservations";
import HostPlace from "./pages/HostPlace";
import HostingIntro from "./pages/HostingIntro";
import MyReservations from "./pages/MyReservations";
import Profile from "./pages/Profile";
import TempProfile from "./pages/TempProfile";
import ViewDetails from "./pages/ViewDetails"
import ConfirmListing from "./pages/ConfirmListing";
import Browse from "./pages/Browse";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/guest-welcome":
        title = "";
        metaDescription = "";
        break;
      case "/host-welcome":
        title = "";
        metaDescription = "";
        break;
      case "/leading-page":
        title = "";
        metaDescription = "";
        break;
      case "/confirm-reservation":
        title = "";
        metaDescription = "";
        break;
      case "/mylistings":
        title = "";
        metaDescription = "";
        break;
      case "/guest-signup-page":
        title = "";
        metaDescription = "";
        break;
      case "/sign-in-page":
        title = "";
        metaDescription = "";
        break;
      case "/host-signup-page":
        title = "";
        metaDescription = "";
        break;
      case "/mypastreservations":
        title = "";
        metaDescription = "";
        break;
      case "/host-place":
        title = "";
        metaDescription = "";
        break;
      case "/hosting-intro":
        title = "";
        metaDescription = "";
        break;
      case "/myreservations":
        title = "";
        metaDescription = "";
        break;
      case "/profile":
        title = "";
        metaDescription = "";
        break;
      case "/urbanstay-landing-page":
        title = "";
        metaDescription = "";
        break;
      case "/view-details":
        title = "";
        metaDescription = "";
        break;
      case "/browse":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/guest-welcome" element={<GuestWelcome />} />
      <Route path="/host-welcome" element={<HostWelcome />} />
      <Route path="/leading-page" element={<LeadingPage />} />
      <Route path="/confirm-reservation" element={<ConfirmReservation />} />
      <Route path="/mylistings" element={<MyListings />} />
      <Route path="/guest-signup-page" element={<GuestSignupPage />} />
      <Route path="/sign-in-page" element={<SignInPage />} />
      <Route path="/host-signup-page" element={<HostSignupPage />} />
      <Route path="/mypastreservations" element={<MyPastReservations />} />
      <Route path="/host-place" element={<HostPlace />} />
      <Route path="/hosting-intro" element={<HostingIntro />} />
      <Route path="/myreservations" element={<MyReservations />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/temp-profile" element={<TempProfile />} />
      <Route path="/view-details/:prop" element={<ViewDetails />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/confirm-listing" element={<ConfirmListing />} />
     
    </Routes>
  );
}
export default App;
