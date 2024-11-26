"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PostDetails({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<{ title: string; body: string } | null>(null);
  const [comments, setComments] = useState<{ id: number; name: string; body: string }[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
   const [successMessage, setSuccessMessage] = useState<string | null>(null); 

   useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data: postData } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        setPost(postData);
        setEditTitle(postData.title); 
        setEditBody(postData.body);

        const { data: commentsData } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    if (params.id) {
      fetchPostData();
    }
  }, [params.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    const newCommentId = comments.length + 1;

    const newCommentObject = {
      id: newCommentId,
      name: newName,
      body: newComment,
    };

    setComments([...comments, newCommentObject]);

    setNewComment("");
    setNewName("");
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true); 
    setError(null); 
    setSuccessMessage(null); 

    const updatedPost = { ...post, title: editTitle, body: editBody };

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`,
        updatedPost
      );

      if (response.status === 200) {
       setPost(updatedPost);
        setIsEditing(false); 

        
        setSuccessMessage("Post updated successfully!");
      } else {
        setError("Failed to update post. Please try again.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>{isEditing ? "Edit Post" : post.title}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>} 

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} 

      {isEditing ? (
        <form onSubmit={handleEditPost}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      ) : (
        <>
          <p>{post.body}</p>
          <button onClick={toggleEditMode}>Edit Post</button>
        </>
      )}

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>

      <h3>Add a Comment</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Your Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <textarea
          placeholder="Your Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </main>
  );
}
