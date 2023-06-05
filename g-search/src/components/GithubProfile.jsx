import React from 'react'
import GithubPofileCard from './GithubPofileCard'
import GithubProfileDetails from './GithubProfileDetails'

const GithubProfile = ({data}) => {
  return (
    <>
   
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className='h5 text-primary'>
                        Github Profile Details
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col col-3">
                    <GithubPofileCard data={data}/>
                </div>
                <div className="col col-9">
                    <GithubProfileDetails data ={data}/>
                </div>

            </div>
        </div>
    </>
  )
}

export default GithubProfile