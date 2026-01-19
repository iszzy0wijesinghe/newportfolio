/** @format */

export default function HireMe() {
  return (
    <div className="space-y-10">
      <section className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
        {/* Left */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-2xl font-semibold">Hire / Freelance</h1>
          <p className="text-sm text-[rgb(var(--muted))] leading-6">
            I don’t just write code — I build products people enjoy using. If you
            want someone who’s detail-driven, fast to adapt, and serious about
            quality, let’s work together.
          </p>

          <form
            action="https://formspree.io/f/mreeqjrn"
            method="POST"
            className="space-y-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
          >
            <input
              className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
              name="name"
              placeholder="Name"
              required
            />
            <input
              className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
            <textarea
              className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
              name="message"
              placeholder="What do you need?"
              rows={5}
              required
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] text-sm hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right (Image like Home) */}
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-soft overflow-hidden">
          <img
            src="/me.webp"
            alt="Portrait"
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}





// export default function HireMe() {
//   return (
//     <div className="max-w-xl space-y-4">
//       <h1 className="text-2xl font-semibold">Hire / Freelance</h1>
//       <p className="text-sm text-[rgb(var(--muted))]">
//         I don’t just write code — I build products people enjoy using. If you want someone who’s detail-driven, fast to adapt, and serious about quality, let’s work together.
//       </p>

//       <form
//         action="https://formspree.io/f/mreeqjrn"
//         method="POST"
//         className="space-y-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
//       >
//         <input className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
//                name="name" placeholder="Name" required />
//         <input className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
//                name="email" placeholder="Email" type="email" required />
//         <textarea className="w-full rounded-xl border border-[rgb(var(--border))] px-3 py-2 bg-[rgb(var(--bg))]"
//                   name="message" placeholder="What do you need?" rows={5} required />
//         <button className="px-4 py-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] text-sm">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
