import React, { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = await fetch(`${baseUrl}/posts/latest`).then((resp) => resp.json());
        setPosts(results);
      } catch (error) {
        // Handle errors
        console.error("Error loading posts:", error);
      }
    };

    fetchData();
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
