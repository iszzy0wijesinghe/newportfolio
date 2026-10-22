
export type PostSection = {
  heading?: string;
  paragraphs: string[];
  points?: string[];
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  cover: string;
  sections: PostSection[];
};

// Review and personalize these editorial starters before publication.
export const posts: Post[] = [
  {
    slug: "the-human-side-of-enterprise-software",
    category: "ENGINEERING / PRODUCT",
    title: "The human side of enterprise software",
    excerpt:
      "Reliable systems are essential. But the details that earn trust often live on the surface.",
    readTime: "4 MIN READ",
    cover: "/story/blog-enterprise.webp",
    sections: [
      {
        paragraphs: [
          "Enterprise software is often evaluated by its architecture, integration points and feature coverage. Those things matter. But users experience a system one decision at a time: a confusing label, a slow response, an uncertain error message, or a reassuring moment of clarity.",
          "The interface is where all the technical decisions become human. A reliable backend is not enough if people cannot tell what happened after pressing a button."
        ]
      },
      {
        heading: "Clarity is a performance feature",
        paragraphs: [
          "A fast screen can still feel slow if it leaves the user guessing. Clear states, predictable feedback and thoughtfully ordered information reduce the effort required to complete a task."
        ],
        points: [
          "Show a useful state while information is loading.",
          "Make successful actions visibly successful.",
          "Use error messages that explain the next step.",
          "Keep familiar patterns familiar when novelty provides no value."
        ]
      },
      {
        heading: "Design for the exception",
        paragraphs: [
          "The perfect flow is not the true test of a product. Real users have interrupted connections, partial data, expired sessions and changing requirements. Good interfaces anticipate these edges without making everyday tasks complicated.",
          "Polish is not decoration. It is the removal of unnecessary uncertainty."
        ]
      },
      {
        heading: "The bridge between disciplines",
        paragraphs: [
          "Engineering and design should not be competing stages. They are two views of the same promise: build something that works, and make it easy for people to understand how it works."
        ]
      }
    ]
  },
  {
    slug: "motion-with-a-purpose",
    category: "DESIGN / MOTION",
    title: "Motion should tell you something",
    excerpt:
      "Animation becomes memorable when it clarifies the story—not when it competes with it.",
    readTime: "3 MIN READ",
    cover: "/story/blog-motion.webp",
    sections: [
      {
        paragraphs: [
          "Motion is one of the easiest ways to make a website feel alive—and one of the easiest ways to make it exhausting. The difference is intent.",
          "When an element appears, moves or changes, the animation should answer a question. Where did this content come from? What changed? Where should I look next?"
        ]
      },
      {
        heading: "Build rhythm, not noise",
        paragraphs: [
          "A considered transition has a beginning, a purpose and an end. Small delays can establish hierarchy. Carefully timed fades can support a reading rhythm. Movement should never force the visitor to wait for information they came to find."
        ]
      },
      {
        heading: "The mobile test",
        paragraphs: [
          "Large pointer-driven effects rarely translate to smaller screens. Mobile motion benefits from shorter distances, smaller transforms and fewer simultaneous layers. Every essential interaction should work without hover."
        ]
      },
      {
        heading: "Accessibility is part of the direction",
        paragraphs: [
          "Some visitors prefer reduced motion. Honoring that preference does not weaken a creative experience; it proves that the design respects its audience.",
          "Great motion supports understanding. The moment it begins to obscure understanding, it has lost its job."
        ]
      }
    ]
  },
  {
    slug: "from-first-sketch-to-working-product",
    category: "PROCESS / CREATIVE TECH",
    title: "From first sketch to working product",
    excerpt:
      "Why the best starting point is a better question, not a prettier screen.",
    readTime: "5 MIN READ",
    cover: "/story/blog-process.webp",
    sections: [
      {
        paragraphs: [
          "A new product often begins as a collection of exciting features. That energy is useful, but it is not a plan. A stronger starting point is to understand who needs the product and what they need to accomplish."
        ]
      },
      {
        heading: "Frame the problem",
        paragraphs: [
          "Before writing code or choosing colors, describe the job to be done. Map the situations in which the product will be used. Make assumptions visible so they can be tested."
        ]
      },
      {
        heading: "Turn understanding into structure",
        paragraphs: [
          "Identify the core entities, flows and failure cases. Decide what the user needs to see and when. Establish a clear information hierarchy before adding complexity."
        ],
        points: [
          "Define the smallest valuable user journey.",
          "Sketch important states, including errors and empty screens.",
          "Choose technology for real constraints rather than trends.",
          "Test the critical interaction before decorating it."
        ]
      },
      {
        heading: "Refinement is a continuous loop",
        paragraphs: [
          "Working software is the first milestone, not the final one. Observe the rough edges, improve feedback, reduce steps and keep measuring whether the product is helping people accomplish their goal.",
          "The goal is not to turn every idea into a feature. It is to turn the right ideas into something people can trust."
        ]
      }
    ]
  }
];
