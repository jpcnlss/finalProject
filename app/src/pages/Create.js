import React, { useState } from "react";
import { H2 } from "@leafygreen-ui/typography";
import TextInput from '@leafygreen-ui/text-input';
import FormFooter from "@leafygreen-ui/form-footer";
import Toast from "@leafygreen-ui/toast";
import { css } from "@leafygreen-ui/emotion";
import { baseUrl } from "../config";

const formStyle = css`
  height: 100vh;
  min-width: 767px;
  margin: 10px;

  input {
    margin-bottom: 20px;
  }
`;

export default function NewPost() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;

      const formData = new FormData();
      formData.append("author", author);
      formData.append("title", title);
      formData.append("tags", tags);
      formData.append("image", image);

      await fetch(`${baseUrl}/posts`, {
        method: "POST",
        body: formData,
        signal,
      }).then((resp) => resp.json());

      // Check if the component is still mounted before updating the state
      if (!signal.aborted) {
        setAuthor("");
        setTitle("");
        setTags("");
        setImage(null);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 3000);
      }
    } catch (error) {
      // Handle other errors
      console.error("Error submitting post:", error);
    }
  };

  return (
    <React.Fragment>
      <H2>Write New Post</H2>
      <form className={formStyle}>
        <TextInput
          label="Author"
          description="Enter your name"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <TextInput
          label="Title"
          description="Enter the title for this blog post"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextInput
          label="Tags"
          description="Enter tags for the post, comma separated if multiple"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <FormFooter
          primaryButton={{
            text: 'Save Blog Post',
            onClick: handleSubmit,
          }}
        />
      </form>

      <Toast
        variant="success"
        title="Post Created"
        body="Your blog post was successfully created."
        open={toastOpen}
        close={() => setToastOpen(false)}
      />
    </React.Fragment>
  );
}
