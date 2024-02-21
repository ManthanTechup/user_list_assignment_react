import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import ProfileCards from './ProfileCards'

function Home() {
    const [data, setData] = useState([])
    const [searchString, setSearchString] = useState('')
    useEffect(() => {
        console.log("first")
        getData()
        return () => {
        }
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get('https://express-t4.onrender.com/api/users')
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            console.log(error)
            toast.error('Error while fetching Data')
        }
    }

    const searchInputHandle = (e) => {
        console.log(e.target.value)
        setSearchString(e.target.value)
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container d-flex justify-content-end">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchInputHandle} />
                    </form>
                </div>
            </nav>
            <div className='container'>
                <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-1">
                    {data && data.length > 0 && data?.filter((d) => { return searchString === '' || d.name.toLowerCase().includes(searchString && searchString.toLowerCase()) }).map((i, k) => {
                        return (
                            <ProfileCards data={i} />
                        )
                    })}
                </div>
                <div className="d-flex justify-content-center mt-4">

                    {data && data.length > 0 && data?.filter((d) => { return searchString === '' || d.name.toLowerCase().includes(searchString && searchString.toLowerCase()) }).length === 0 && <h1>No records found </h1>}
                    {!data && <div>No records found</div>}
                </div>

            </div>
        </div>
    )
}

export default Home;