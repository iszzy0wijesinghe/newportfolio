import { profile } from "../content/profile";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import { Link } from "react-router-dom";

export default function WhoAmI() {
  return (
    <div className="space-y-10">
      <Reveal>
        <h1 className="text-2xl font-semibold">Who Am I</h1>
        <p className="mt-3 text-sm text-[rgb(var(--muted))] max-w-2xl leading-6">
          I’m{" "}
          <span className="font-medium text-[rgb(var(--fg))]">{profile.name}</span>, a{" "}
          <span className="font-medium text-[rgb(var(--fg))]">{profile.role}</span>{" "}
          from {profile.location}. I’m currently pursuing a BSc in Information Technology (Specializing in IT) and working as a Software Engineer Intern. I build clean, fast, responsive web apps with practical architecture — focusing on performance, clarity, and real-world folder structures that teams can scale confidently.
        </p>
      </Reveal>

      <Reveal className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
          <img
            src="/me2.webp"
            alt="Portrait"
            className="block w-full h-auto rounded-2xl border border-[rgb(var(--border))]"
            loading="lazy"
          />

          <div>
            <div className="text-sm font-semibold">Education</div>

            <ul className="mt-3 text-sm text-[rgb(var(--muted))] space-y-2 leading-6">
              <li>
                • <span className="text-[rgb(var(--fg))] font-medium">BSc in Information Technology</span>{" "}
                (Specializing in IT) — Sri Lanka Institute of Information Technology (SLIIT),{" "}
                <span className="font-medium">2023 – Present</span>
              </li>
              <li>
                • <span className="text-[rgb(var(--fg))] font-medium">GCE Advanced Level</span>{" "}
                — D.S. Senanayake College (Colombo 07), <span className="font-medium">2022/23</span>{" "}
                <span className="block sm:inline">• Subjects: Combined Maths, Chemistry, Physics</span>
              </li>
              <li>
                • <span className="text-[rgb(var(--fg))] font-medium">GCE Ordinary Level</span>{" "}
                — Mahinda Rajapaksa College (Homagama), <span className="font-medium">2019</span>{" "}
                <span className="block sm:inline">• 8 Distinctions + 1 Very Good pass</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                className="px-4 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition text-sm"
              >
                Download Resume
              </a>
              <Link
                to="/projects"
                className="px-4 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] transition text-sm"
              >
                See Projects
              </Link>
            </div>

            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}




// import { profile } from "../content/profile";
// import Reveal from "../components/Reveal";
// import SocialLinks from "../components/SocialLinks";
// import { Link } from "react-router-dom";

// export default function WhoAmI() {
//   return (
//     <div className="space-y-10">
//       <Reveal>
//         <h1 className="text-2xl font-semibold">Who Am I</h1>
//         <p className="mt-3 text-sm text-[rgb(var(--muted))] max-w-2xl leading-6">
//           I’m <span className="font-medium text-[rgb(var(--fg))]">{profile.name}</span>, a{" "}
//           <span className="font-medium text-[rgb(var(--fg))]">{profile.role}</span>.
//           I build clean, fast, responsive web apps with strong UX and practical architecture.
//         </p>
//       </Reveal>

//       <Reveal className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-soft">
//         <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
//           <img
//             src="/me.webp"
//             alt="Portrait"
//             className="block w-full h-auto rounded-2xl border border-[rgb(var(--border))]"
//             loading="lazy"
//           />
//           <div>
//             <div className="text-sm font-semibold">My style</div>
//             <ul className="mt-3 text-sm text-[rgb(var(--muted))] space-y-2 leading-6">
//               <li>• Performance-first: no lag, no heavy animations by default.</li>
//               <li>• Clean UI: consistent spacing, readable typography, calm colors.</li>
//               <li>• Real-world: scalable folder structure, reusable components.</li>
//               <li>• Accessibility: theme, contrast, font-size controls built-in.</li>
//             </ul>

//             <div className="mt-5 flex flex-wrap gap-3">
//               <a
//                 href={profile.resumeUrl}
//                 className="px-4 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition text-sm"
//               >
//                 Download Resume
//               </a>
//               <Link
//                 to="/projects"
//                 className="px-4 py-2 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] transition text-sm"
//               >
//                 See Projects
//               </Link>
//             </div>

//             <div className="mt-5">
//               <SocialLinks />
//             </div>
//           </div>
//         </div>
//       </Reveal>
//     </div>
//   );
// }
