import { Outlet, useLocation, useNavigate } from "react-router";
import {
   Link,
    RouterProvider,
    createBrowserRouter,
  } from "react-router-dom";
import App from "./pages/discover";
import { ArrowUnion, HomeSimple, LogOut, Map, Settings } from "iconoir-react";
import Onboarding from "./pages/onboarding";
import MapPage from "./pages/map";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile.page";
import ComparePage from "./pages/compare";
import { useEffect } from "react";
import { useState } from "react";

function LeftMenu() {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  useEffect(() => {
    const updateUserFromLocalStorage = () => {
      var user = localStorage.getItem('user');
      var profilePictureVerif = localStorage.getItem('profilePicture');
      if (user) {
        var userObject = JSON.parse(user);
        setName(userObject.name || '');
        setUsername(userObject.firstname || '');
      }
      if (profilePictureVerif) {
        setProfilePicture(profilePictureVerif);
      }
    }
    updateUserFromLocalStorage();

    const intervalId = setInterval(() => {
      updateUserFromLocalStorage();
    }, 1000); // Vérifie chaque seconde

    // Nettoyer l'intervalle lors du démontage du composant
    return () => {
      clearInterval(intervalId);
    };
  }, [])
  const location = useLocation();
  const navigate = useNavigate(); 
    const onDisconnect = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
      <div className="w-[200px] h-full bg-black flex flex-col items-center justify-between py-10 drop-shadow-lg rounded-lg px-5">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-24 h-24 rounded-full bg-white overflow-hidden">
            <img src={profilePicture} className="w-full h-full" />
          </div>
          <div>
            <p className="font-bold text-lg">{name} {username}</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 mb-40 w-full">
          <Link to="/">
            <div className={`flex gap-3 items-center ${location.pathname === "/" ? "bg-gray-100/15" : "hover:bg-gray-100/15" } py-2 px-3 rounded hover:cursor-pointer`}>
              <HomeSimple width={24} height={24} className={location.pathname === "/" ? "text-white" : "text-gray-200"} strokeWidth={2.5} />
              <p className="font-semibold">Discover</p>
            </div>
          </Link>
          <Link to="/map">
            <div className={`flex gap-3 items-center ${location.pathname === "/map" ? "bg-gray-100/15" : "hover:bg-gray-100/15" } py-2 px-3 rounded hover:cursor-pointer`}>
              <Map width={24} height={24} className={location.pathname === "/map" ? "text-white" : "text-gray-200"} strokeWidth={2.5} />
              <p className="font-semibold">Map</p>
            </div>
          </Link>
          <Link to="/compare">
            <div className={`flex gap-3 items-center ${location.pathname === "/compare" ? "bg-gray-100/15" : "hover:bg-gray-100/15" } py-2 px-3 rounded hover:cursor-pointer`}>
              <ArrowUnion width={24} height={24} className={location.pathname === "/compare" ? "text-white" : "text-gray-200"} strokeWidth={2.5} />
              <p className="font-semibold">Compare</p>
            </div>
          </Link>
          <Link to="/profile">
            <div className={`flex gap-3 items-center ${location.pathname === "/profile" ? "bg-gray-100/15" : "hover:bg-gray-100/15" } py-2 px-3 rounded hover:cursor-pointer`}>
              <Settings width={24} height={24} className={location.pathname === "/profile" ? "text-white" : "text-gray-200"} strokeWidth={2} />
              <p className="font-semibold">Profile</p>
            </div>
          </Link>
        </div>
        <div className="flex gap-2 items-center w-full pl-3 hover:cursor-pointer" onClick={() => onDisconnect()}>
          <LogOut width={20} height={20} className="text-red-500" />
          <p className="text-red-500">Log out</p>
        </div>
      </div>
    );
  }

  function IndexLayout() {
    return (
     <div className="w-full h-full bg-[#FFFBF0] flex">
        <div className="h-dvh p-3">
            <LeftMenu />
        </div>
        <div className="flex-1 bg-[#FFFBF0] p-5">
          <Outlet />
        </div>
     </div>
    );
  }
  

  function ProtectedRoute(props: {
    children: React.ReactNode;
  }) {
    const user = localStorage.getItem('user');
    const navigate = useNavigate()

    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [])

    return (
      <div>
        {props.children}
      </div>
    )
  }
  
  export const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <IndexLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          path: "/",
          breadcrumbName: "/",
          element: <App />,
        },
        {
          path: "/map",
          breadcrumbName: "/map",
          element: <MapPage />,
        },
        {
          path: "/profile",
          breadcrumbName: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/compare",
          breadcrumbName: "/compare",
          element: <ComparePage />
        },
        {
          path: "*",
          element: <></>,
        },
      ],
    },
    {
      path: "/onboarding",
      breadcrumbName: "/onboarding",
      element: <Onboarding />,
    },
    {
      index: true,
      path: "/login",
      breadcrumbName: "/login",
      element: <LoginPage />,
    },
    {
      index: true,
      path: "/register",
      breadcrumbName: "/register",
      element: <RegisterPage />,
    },
  ];
  
  export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
  }
  