import { lazy } from "react";
import { Navigate } from "react-router-dom";

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
	lazy(() => import("../pages/content/ContentList/ContentList"))
);
const ContentDetail = Loadable(
	lazy(() => import("../pages/content/ContentDetail/ContentDetail"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			path: "/",
			element: <Navigate to="/content" />,
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
					element: <Navigate to="/content" />,
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
			path: "content/:folderId",
			element: <ContentList />,
		},
		{
			path: "content/:folderId/:contentId",
			element: <ContentDetail />,
		},
	],
};

export default MainRoutes;
