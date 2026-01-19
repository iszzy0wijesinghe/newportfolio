import { lazy } from "react";

const Home = lazy(() => import("./../pages/Home"));
const WhoAmI = lazy(() => import("./../pages/WhoAmI"));
const Projects = lazy(() => import("./../pages/Projects"));
const ProjectDetail = lazy(() => import("./../pages/ProjectDetail"));
const Certificates = lazy(() => import("./../pages/Certificates"));
const Experience = lazy(() => import("./../pages/Experience"));
const TechStack = lazy(() => import("./../pages/TechStack"));
const HireMe = lazy(() => import("./../pages/HireMe"));
const NotFound = lazy(() => import("./../pages/NotFound"));

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/who-am-i", element: <WhoAmI /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:id", element: <ProjectDetail /> },
  { path: "/certificates", element: <Certificates /> },
  { path: "/experience", element: <Experience /> },
  { path: "/tech", element: <TechStack /> },
  { path: "/hire-me", element: <HireMe /> },
  { path: "*", element: <NotFound /> },
];
