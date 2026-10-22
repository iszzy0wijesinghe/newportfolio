
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const WhoAmI = lazy(() => import("../pages/WhoAmI"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const Experience = lazy(() => import("../pages/Experience"));
const TechStack = lazy(() => import("../pages/TechStack"));
const Certificates = lazy(() => import("../pages/Certificates"));
const HireMe = lazy(() => import("../pages/HireMe"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/who-am-i", element: <WhoAmI /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:id", element: <ProjectDetail /> },
  { path: "/experience", element: <Experience /> },
  { path: "/tech", element: <TechStack /> },
  { path: "/certificates", element: <Certificates /> },
  { path: "/hire-me", element: <HireMe /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "*", element: <NotFound /> }
];
