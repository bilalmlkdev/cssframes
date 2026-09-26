import { useEffect, useState } from "react";

// Live GitHub star count for the repo. Stays null while loading or when the
// API is unavailable (rate limit, offline) - callers hide the number then.
export function useStars(repo) {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          !cancelled &&
          data &&
          typeof data.stargazers_count === "number"
        ) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        /* offline or rate limited */
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return stars;
}
