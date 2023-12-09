import React, { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const loadPosts = async () => {
      try {
        let results = await fetch(`${baseUrl}/posts/latest`, { signal }).then((resp) => resp.json());

        // Check if the component is still mounted before updating the state
        if (isMounted) {
          setPosts(results);
        }
      } catch (error) {
        // Handle errors
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();

    // Cleanup function to cancel the fetch when the component is unmounted
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <React.Fragment>
      <H2>Latest Articles</H2>
      <div>
        {posts.map((post) => {
          return <PostSummary {...post} key={post._id} />;
        })}
      </div>
    </React.Fragment>
  );
}
