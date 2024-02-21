import React from 'react'
import { Link } from 'react-router-dom'

function ProfileCards({ data }) {

    return (
        <div className='col p-2 d-flex justify-content-center'>
            <Link to={'/profile/' + data._id} className="card text-decoration-none profile-card cursor-pointer" >
                <img src={data.picture} className="card-img-top" alt={data.name} />
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">Company : {data.company}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProfileCards