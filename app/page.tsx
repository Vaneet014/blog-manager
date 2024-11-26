"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostsPage() {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      alert("Post deleted successfully!");
    } catch (error) {
      alert("Failed to delete the post.");
    }
  };

  return (
    <main>
      <Link href="/post/create">
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Create New Post
        </button>
      </Link>

      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link href={`/post/${post.id}`}>View More</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
