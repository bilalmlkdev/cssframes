import { GithubIcon } from "./GithubIcon";
import { useStars } from "../../hooks/useStars";
import { formatStars } from "../../utils/format";

export function GitHubStarsLink({ repo, className = "" }) {
  const stars = useStars(repo);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub repository"
      className={`flex items-center gap-1.5 transition-colors hover:text-muted ${className}`}
    >
      <GithubIcon size={16} />
      {stars !== null && (
        <span className="font-mono text-xs">{formatStars(stars)}</span>
      )}
    </a>
  );
}
