import React, { useState, useEffect } from "react";
import ExpandableCard from "@leafygreen-ui/expandable-card";
import { H2, H3, Body } from "@leafygreen-ui/typography";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import TextInput from '@leafygreen-ui/text-input';
import Icon from "@leafygreen-ui/icon";
import Button from "@leafygreen-ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function App() {
  let params = useParams();
  let [post, setPost] = useState({});
  let [showModal, setShowModal] = useState(false);
  let [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const deletePost = async () => {
    await fetch(`${baseUrl}/posts/${params.id}`, {
      method: "DELETE"
    });
    return navigate("/");
  };

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      try {
        let results = await fetch(`${baseUrl}/posts/${params.id}`).then(resp => resp.json());

        // Check if the component is still mounted before updating the state
        if (isMounted) {
          setPost(results);
        }
      } catch (error) {
        // Handle errors
        console.error("Error loading post:", error);
      }
    };

    loadPost();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };

  }, [params.id]);

  const handleNewComment = async () => {
    await fetch(`${baseUrl}/posts/comment/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        author
      })
    });

    let result = await fetch(`${baseUrl}/posts/${params.id}`).then(resp => resp.json());
    setPost(result);

    setAuthor("");
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <H2>{post.title}</H2>
      <H3>by {post.author}</H3>
      {post.imageUrl && <img src={post.imageUrl} alt="Post Image" />}
      <Button variant="primary" leftGlyph={<Icon glyph="Megaphone" />} onClick={() => setShowModal(true)}>
        Add Comment
      </Button>&nbsp;&nbsp;
      <Button variant="danger" leftGlyph={<Icon glyph="Trash" />} onClick={deletePost}>
        Delete Post
      </Button>
      <br/><br/>
      {post && post.comments &&
        <ExpandableCard title="Comments">
          {post.comments.map(comment => (
            <p key={comment.id}>
              <Body weight="medium">{comment.author} said: </Body>
              <Body>{comment.body}</Body>
            </p>
          ))}
        </ExpandableCard>
      }

      <ConfirmationModal
        open={showModal}
        buttonText="Save Comment"
        onConfirm={handleNewComment}
        onCancel={() => setShowModal(false)}
        // Modify this line based on the actual implementation of ConfirmationModal
        title={post.title ? <H2>{post.title}</H2> : "Default Title"}
      >
        <TextInput
          label="Name"
          description="Enter your name"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        {/* No TextArea for body since we're only allowing an image */}
      </ConfirmationModal>
    </React.Fragment>
  );
}
