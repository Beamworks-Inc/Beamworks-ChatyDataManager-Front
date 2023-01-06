import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

// render - sample page
const SamplePage = Loadable(
  lazy(() => import("../pages/extra-pages/SamplePage"))
);

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import("../pages/dashboard/dashboard"))
);

// render - utilities
const Typography = Loadable(
  lazy(() => import("../pages/components-overview/Typography"))
);
const Color = Loadable(
  lazy(() => import("../pages/components-overview/Color"))
);
const Shadow = Loadable(
  lazy(() => import("../pages/components-overview/Shadow"))
);
const AntIcons = Loadable(
  lazy(() => import("../pages/components-overview/AntIcons"))
);

// render - beamworks pages
const ContentList = Loadable(
  lazy(() => import("../pages/content/ContentList"))
);
const ContentDetail = Loadable(
  lazy(() => import("../pages/content/ContentDetail"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "color",
      element: <Color />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "shadow",
      element: <Shadow />,
    },
    {
      path: "typography",
      element: <Typography />,
    },
    {
      path: "icons/ant",
      element: <AntIcons />,
    },
    {
      path: "content",
      element: <ContentList />,
    },
    {
      path: "content/:folderName",
      element: <ContentList />,
    },
    {
      path: "content/:folderName/:contentId",
      element: <ContentDetail />,
    },
  ],
};

export default MainRoutes;