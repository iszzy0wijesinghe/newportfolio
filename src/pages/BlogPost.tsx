
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { posts } from "../content/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = post
      ? `${post.title} | Isindu Wijesinghe`
      : "Journal | Isindu Wijesinghe";

    return () => {
      document.title =
        "Isindu Wijesinghe — Engineering with imagination";
    };
  }, [post]);

  if (!post) {
    return (
      <div className="container-wide interior-page">
        <h1 className="page-title">
          Note <em>not found.</em>
        </h1>

        <Link className="inline-arrow" to="/blog">
          Back to journal
          <ArrowLeft size={20} />
        </Link>
      </div>
    );
  }

  const next = posts.find(
    (item) => item.slug !== post.slug
  );

  return (
    <article className="container-wide interior-page article-page">
      <Reveal>
        <Link className="back-link" to="/blog">
          <ArrowLeft size={17} />
          ALL JOURNAL ENTRIES
        </Link>

        <p className="eyebrow">
          {post.category} / {post.readTime}
        </p>

        <h1 className="page-title">
          {post.title}
          <span className="headline-dot">.</span>
        </h1>

        <p className="page-lead">
          {post.excerpt}
        </p>
      </Reveal>

      <div className="article-divider" />

      <div className="article-content">
        {post.sections.map((section, index) => (
          <Reveal key={index}>
            <section>
              {section.heading && (
                <h2>{section.heading}</h2>
              )}

              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}

              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="article-next">
          <span className="eyebrow">
            KEEP READING
          </span>

          {next && (
            <Link to={`/blog/${next.slug}`}>
              {next.title}
              <ArrowUpRight size={25} />
            </Link>
          )}
        </div>
      </Reveal>
    </article>
  );
}
