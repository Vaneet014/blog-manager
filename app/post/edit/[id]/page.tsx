"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      setTitle(data.title);
      setBody(data.body);
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${params.id}`, { title, body });
      setMessage("Post updated successfully!");
    } catch (error) {
      setMessage("Failed to update post.");
    }
  };

  return (
    <main>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
