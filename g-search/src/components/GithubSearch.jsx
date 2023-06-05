import React, { useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "./GithubCredentials";
import axios from "axios";
import GithubProfile from "./GithubProfile";
import GithubRepos from "./GithubRepos";
const GithubSearch = () => {
  const [githubUser, setgithubUser] = useState("");
  const [githubProfile, setgithubProfile] = useState({});
  const [githubRepos, setgithubRepos] = useState({});

  const submitSearch = async (e) => {
    e.preventDefault();
    let dataURL = `https://api.github.com/users/${githubUser}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    let response = await axios.get(dataURL);
    // console.log(response.data);
    setgithubProfile(response.data);
    let dataURL2 = `https://api.github.com/users/${githubUser}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    let response2 = await axios.get(dataURL2);

    setgithubRepos(response2.data);
    // console.log(response2.data);
  };
  return (
    <>
      <div className="container mt-6">
        <div className="row">
          <div className="column">
            <p className="display-3">Github Profile Search</p>
            <p className="lead font-weight-bold">
              Search a github profile to see his/her activities
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form className="form-inlne" onSubmit={submitSearch}>
              <input
                style={{ fontWeight: "bold" }}
                value={githubUser}
                onChange={(e) => setgithubUser(e.target.value)}
                size={30}
                className="form-control"
                placeholder="Github UserName"
                type="text"
              />

              <input
                type="submit"
                value="Search"
                className="btn btn-secondary btn-sm mt-1"
              />
            </form>
          </div>
        </div>
      </div>

      <div>
        {   Object.keys(githubProfile).length>0 &&
            <GithubProfile data={githubProfile}/>
        }
      </div>
      <div>
      {   githubRepos.length>0 &&
            <GithubRepos data={githubRepos}/>
        }
        

      </div>
    </>
  );
};

export default GithubSearch;
