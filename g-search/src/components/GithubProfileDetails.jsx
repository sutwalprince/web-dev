import React from 'react'

const GithubProfileDetails = ({data}) => {
  return (
    <>
        <div className="card">
            <div className="card-header">
                <span className='badge bg-success mx-2'> 
                    {data.followers} Followers
                </span>

                <span className='badge bg-warning mx-2'> 
                    {data.public_repos} Repos
                </span>

                <span className='badge bg-danger mx-2'> 
                    {data.public_gists} Gists
                </span>

                <span className='badge bg-secondary mx-2'> 
                    {data.following} Following
                </span>
            </div>
            <div className="card-body">
                <ul className='list-group'>
                    <li className="list-group-item">   
                        NAME : <span className='fw-bold'>{data.name}</span>
                    </li>
                    <li className="list-group-item">
                        EMAIL : <span>{data.email}</span>
                    </li> 
                    <li className="list-group-item">
                        LOCATION : <span>{data.location}</span>
                    </li> 
                    <li className="list-group-item">
                        COMPANY : <span>{data.company}</span>
                    </li>   
                    <li className="list-group-item">
                        BLOG : <span><a href={data.blog} target='_blank'>Click</a></span>
                    </li>
                    <li className="list-group-item">
                        MEMBER SINCE : <span>{data.created_at}</span>
                    </li>
                    

                </ul>
            </div>
        </div>
    </>
  )
}

export default GithubProfileDetails