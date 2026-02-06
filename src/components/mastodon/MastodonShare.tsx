import React from "react";

interface MastodonShareProps {
  text?: string;
  url: string; // We'll pass the URL from Astro to ensure accuracy
  children: React.ReactNode;
}

export const MastodonShare: React.FC<MastodonShareProps> = ({
  text = "Check out this post!",
  url,
  children,
}) => {
  const handleShare = () => {
    // 1. Check local storage for a saved instance
    let instance = localStorage.getItem("mastodon_instance");

    // 2. If no instance found, prompt the user
    if (!instance) {
      instance = window.prompt(
        "Please enter your Mastodon instance (e.g., mastodon.social):"
      );
    }

    // 3. Process the share if we have an instance
    if (instance) {
      // Clean up the URL (remove https:// and trailing slashes)
      const cleanInstance = instance
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");

      // Save for future use
      localStorage.setItem("mastodon_instance", cleanInstance);

      // Build the share URL
      const shareUrl = `https://${cleanInstance}/share?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;

      // Open in new tab
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button onClick={handleShare} className="mastodon-share-btn" type="button">
      {children}
    </button>
  );
};
