import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Edit = () => {

  let postId = useParams().postId;
  let navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    text: "",
    image: "",
  });

  const getPost = async () => {
    const { data } = await axios.get(`/api/${postId}`);
    setPost(data.post);
  };

  useEffect(() => {
    getPost();
  }, []);

  const updateInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const editPost = async () => {
    console.log(post);
    const{data } = await axios.put(`/api/${postId}`, post, {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire(data.msg, "", "success");
    navigate(`/`);
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

        <button className="btn btn-primary" onClick={editPost}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default Edit;
