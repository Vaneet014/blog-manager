'use client';
import { useState, useEffect } from "react";
import axios from "axios";

interface PostFormProps {
  postId?: string; 
}

const PostForm: React.FC<PostFormProps> = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchPostData = async () => {
        try {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          setTitle(data.title);
          setBody(data.body);
        } catch (error) {
          setMessage("Failed to fetch post data.");
        }
      };
      fetchPostData();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const postData = { title, body };

    try {
      let response;
      if (postId) {
        response = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          postData
        );
        setMessage("Post updated successfully!");
      } else {
        response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          postData
        );
        setMessage("Post created successfully!");
      }

      setTitle("");
      setBody("");
    } catch (error) {
      setMessage("Failed to create or update post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>{postId ? "Edit Post" : "Create New Post"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : postId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PostForm;
