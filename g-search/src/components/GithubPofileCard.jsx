import React from 'react'

const GithubPofileCard = ({data}) => {
  return (
    <>
        <div className="card">
            <img src={data.avatar_url} alt="img"  className='img-fluid'/>
            <div className="card-body">
                 <p className='h4'>{data.name}</p>
                 <small>{data.bio}</small>
                 <br />
                 <a href={data.html_url}
                 className='btn btn-success btn-sm' target='_blank'>Profile</a>
            </div>
        </div>
    </>
  )
}

export default GithubPofileCard