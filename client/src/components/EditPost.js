import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { updatePost, getSinglePost } from "../actions";
import Message from "./Common/Message";

function EditPost(props) {
  const { singlePost, message, error } = useSelector((state) => {
    return {
      singlePost: state.singlePost || {},
      message: state.message || "",
      error: state.error || "",
    };
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bodyName, setBodyName] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(singlePost).length !== 0) {
      setTitle(singlePost.title);
      setDescription(singlePost.description);
      setBodyName(singlePost.bodyName);
    }
  }, [singlePost]);

  const handleUpdate = (id) => {
    const payload = {
      title,
      description,
      bodyName,
      tags: !tags
        ? singlePost.tags.filter((tag) => tag)
        : [...singlePost.tags, tags],
    };

    dispatch(
      updatePost(payload, id, (succeed) => {
        if (succeed) {
          setLoading(false);
          props.history.push(`/post/${id}`);
        } else {
          setLoading(false);
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      getSinglePost(props.match.params.id, (success) => {
        if (success) {
          setLoading(false);
        }
      })
    );
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Loader type="Puff" color="#666" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="post-wrapper">
      <div className="postForm-wrapper">
        <input
          type="text"
          name="title"
          value={title}
          id=""
          placeholder="Add Title..."
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="bodyName"
          value={bodyName}
          id=""
          placeholder="Add body..."
          onChange={(event) => setBodyName(event.target.value)}
        />
        <textarea
          name="description"
          id=""
          value={description}
          placeholder="Add description..."
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Add Tags..."
          name="tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
        <div>
          <Message error={error} message={message} />
          <button onClick={(id) => handleUpdate(singlePost._id)}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
