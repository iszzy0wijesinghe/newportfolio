import { NavLink } from "react-router-dom";
import { profile } from "../content/profile";
import clsx from "clsx";
import { useState } from "react";
import ResumeModal from "./ResumeModal";

const linkBase = "text-sm px-3 py-2 rounded-xl transition hover:bg-[rgb(var(--card))]";
const active = "bg-[rgb(var(--card))]";

export default function Header() {
  const [openResume, setOpenResume] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/75">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="font-semibold tracking-tight">
            {profile.brand}
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/who-am-i" className={({isActive}) => clsx(linkBase, isActive && active)}>Who Am I</NavLink>
            <NavLink to="/projects" className={({isActive}) => clsx(linkBase, isActive && active)}>Projects</NavLink>
            <NavLink to="/certificates" className={({isActive}) => clsx(linkBase, isActive && active)}>Certificates</NavLink>
            <NavLink to="/experience" className={({isActive}) => clsx(linkBase, isActive && active)}>Experience</NavLink>
            <NavLink to="/tech" className={({isActive}) => clsx(linkBase, isActive && active)}>Tech</NavLink>
            <NavLink to="/hire-me" className={({isActive}) => clsx(linkBase, isActive && active)}>Hire Me</NavLink>
          </nav>

          <button
            onClick={() => setOpenResume(true)}
            className="text-sm px-3 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition"
          >
            View Resume
          </button>
        </div>
      </header>

      <ResumeModal
        open={openResume}
        onClose={() => setOpenResume(false)}
        pdfUrl={profile.resumeUrl}
        title={`${profile.name} — Resume`}
      />
    </>
  );
}





// import { NavLink } from "react-router-dom";
// import { profile } from "../content/profile";
// import clsx from "clsx";


// const linkBase = "text-sm px-3 py-2 rounded-xl transition hover:bg-[rgb(var(--card))]";
// const active = "bg-[rgb(var(--card))]";

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-40 backdrop-blur border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/75">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         <NavLink to="/" className="font-semibold tracking-tight">
//           {profile.brand}
//         </NavLink>

//         <nav className="hidden md:flex items-center gap-1">
//           <NavLink to="/who-am-i" className={({isActive}) => clsx(linkBase, isActive && active)}>Who Am I</NavLink>
//           <NavLink to="/projects" className={({isActive}) => clsx(linkBase, isActive && active)}>Projects</NavLink>
//           <NavLink to="/certificates" className={({isActive}) => clsx(linkBase, isActive && active)}>Certificates</NavLink>
//           <NavLink to="/experience" className={({isActive}) => clsx(linkBase, isActive && active)}>Experience</NavLink>
//           <NavLink to="/tech" className={({isActive}) => clsx(linkBase, isActive && active)}>Tech</NavLink>
//           <NavLink to="/hire-me" className={({isActive}) => clsx(linkBase, isActive && active)}>Hire Me</NavLink>
//         </nav>

//         <a
//           href={profile.resumeUrl}
//           className="text-sm px-3 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition"
//         >
//           Download CV
//         </a>
//       </div>
//     </header>
//   );
// }
