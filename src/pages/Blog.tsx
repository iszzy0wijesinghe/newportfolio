
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { posts } from "../content/posts";

export default function Blog() {
  return (
    <div className="container-wide interior-page">
      <Reveal>
        <p className="eyebrow">
          CHAPTER 06 / NOTES FROM THE PROCESS
        </p>

        <h1 className="page-title">
          The thoughts <em>between builds.</em>
        </h1>

        <p className="page-lead">
          An evolving notebook on engineering, design,
          motion, products and the questions worth asking.
        </p>
      </Reveal>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <Reveal
            key={post.slug}
            delay={(i % 2) * 80}
          >
            <Link
              className="blog-card"
              to={`/blog/${post.slug}`}
            >
              <div className="blog-card-art">
                <span>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="blog-art-ring" />
              </div>

              <div className="blog-card-copy">
                <span className="eyebrow">
                  {post.category} / {post.readTime}
                </span>

                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                <span className="inline-arrow">
                  Read article
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
