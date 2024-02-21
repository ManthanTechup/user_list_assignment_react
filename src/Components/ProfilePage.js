import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const [data, setData] = useState([])
    const { id } = useParams()
    useEffect(() => {
        getUserById(id)
    }, [id])
    const getUserById = async (id) => {
        try {
            const response = await axios.get(`https://express-t4.onrender.com/api/users/${id}`)
            setData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="profile-page-container" >
            <div className='container p-5'>
                <div className="card profile-page-card p-5 w-100">
                    <div className="profile-image d-flex justify-content-center">
                        <img src={data?.picture} alt={data?.name} className='rounded-circle object-fit-cover' />
                    </div>
                    <hr />
                    <div className="row row-cols-1 row-cols-md-3 row-gap-4">
                        <div className="col">
                            <div className="fw-bold">
                                Name :
                            </div>
                            {data?.name}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Gender :
                            </div>
                            {data?.gender}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Eye Color :
                            </div>
                            {data?.eyeColor}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Age :
                            </div>
                            {data?.age}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Company :
                            </div>
                            {data?.company}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Email :
                            </div>
                            <Link className='text-decoration-none' target='_blank' to={`mailto:${data?.email}`}>{data?.email}</Link>
                        </div>

                        <div className="col">
                            <div className="fw-bold">
                                Phone :
                            </div>
                            <Link className='text-decoration-none' target='_blank' to={`tel:${data?.phone}`}>{data?.phone}</Link>
                        </div>

                        <div className="col">
                            <div className="fw-bold">
                                Address :
                            </div>
                            {data?.address}
                        </div>
                        <div className="col">
                            <div className="fw-bold">
                                Favorite Fruit :
                            </div>
                            {data?.favoriteFruit}
                        </div>




                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="fw-bold">
                                About :
                            </div>
                            {data?.about}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfilePage