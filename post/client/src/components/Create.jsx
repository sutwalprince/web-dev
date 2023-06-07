import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Create = () => {
  let navigate = useNavigate();
  const [post, setPost] = useState({
    name: "",
    text: "",
    image: "",
  });

  const createPost = async () => {
    console.log(post);
    await axios.post("/api", post, {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire("Post created successfully","","success");
    navigate("/");
  };

  const updateInput = (e) => {
    setPost({...post, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <div className="input-group mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            value={post.name}
            onChange={updateInput}
          />
        </div>

        <div className="input-group mb-3">
          <input
            name="text"
            type="text"
            className="form-control"
            placeholder="Enter Text"
            aria-label="Enter Text"
            value={post.text}
            aria-describedby="basic-addon1"
            onChange={updateInput}
          />
        </div>

        <div className="input-group mb-3">
          <input
            name="image"
            type="text"
            className="form-control"
            value={post.image}
            placeholder="Image LInk"
            aria-label="Image Link"
            aria-describedby="basic-addon1"
            onChange={updateInput}
          />
        </div>

        <button className="btn btn-primary" onClick={createPost}>
          Post
        </button>
      </div>
    </>
  );
};

export default Create;
