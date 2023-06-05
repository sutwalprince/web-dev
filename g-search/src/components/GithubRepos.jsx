import React from 'react'

const GithubRepos = ({data}) => {
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className='h5 text-primary'>
                        Github Repos Details 
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <p className='h4'>Your Repositories</p>
                        </div>
                        <div className="card-body">
                            <ul className='list-group'>
                                {
                                    data.map((repo)=>{
                                        return(
                                            <>
                                                <li className='list-group-item'>
                                                    <div className="d-flex justify-content-between">
                                                        <span className='h5 flex-grow-1'>
                                                            <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                                                        </span>

                                                        <span>
                                                        <span className='badge bg-success align-items-center me-5'>
                                                            {repo.stargazers_count} stars
                                                        </span>

                                                        <span className='badge bg-warning'>
                                                           {repo.watchers_count} watchers
                                                        </span>
                                                        </span>
                                                        
                                                        
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GithubRepos