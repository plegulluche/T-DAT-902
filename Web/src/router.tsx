import { Outlet } from "react-router";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";

function LeftMenu() {
    return (
      <div className="w-[240px] h-full">
        <div className="w-full h-[56px] bg-surface-100 shadow z-20 relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-lg font-bold">Left Menu</div>
          </div>
        </div>
        <div className="w-full h-[calc(100%-56px)] overflow-auto">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-lg font-bold">Left Menu Content</div>
          </div>
        </div>
      </div>
    );
  }

  function IndexLayout() {
    return (
      <div className="full xl:min-w-[1200px] relative">
        <div className="flex h-full">
          <div className="flex h-full bg-surface-900 text-onsurface-900">
            <LeftMenu />
          </div>
          <div className="full flex-1 overflow-hidden relative bg-surface-500">
            <div className={`w-full h-[calc(100%-56px)] overflow-auto`}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  export const routes = [
    {
      path: "/",
      element: (
          <IndexLayout />
      ),
      children: [
        {
          index: true,
          path: "/",
          breadcrumbName: "/",
          element: <App />,
        },
        {
          path: "*",
          element: <></>,
        },
      ],
    },
  ];
  
  export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
  }
  