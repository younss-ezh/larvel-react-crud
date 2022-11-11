import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from "axios";

export function ShowStudent() {

    const [ fullname, setFullname ] = useState('')
    const [ city, setCity ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ load, setLoad ] = useState(true)
    
    const params = useParams()

    useEffect(() => {
        showStudent()
    }, [])

    const showStudent = async () => {
        const student_id = params.id
        const res = await axios.get(`http://localhost:8000/api/show-student/${student_id}`)
         if(res.data.status === 200) {
            setFullname(res.data.student.fullname)
            setCity(res.data.student.city)
            setEmail(res.data.student.email)
            setLoad(false)
         }
    }

    var Html_tag = ""

    if(load){
        Html_tag = <h2 className="text-center">Loading...</h2>
    }else {
        Html_tag = <>
            <div className="card-title">
                        <h2>{fullname}
                            <Link to='/' className="btn btn-dark btn-sm float-end">Back</Link>
                        </h2>
                    </div>
                    <div className="card-body">
                        <h5>City: {city}</h5>
                        <h5>Email: {email}</h5>
            </div>
            </>
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                <div className="card p-3 text-center">
                    {Html_tag}
                </div>
                </div>
            </div>
        </div>
    )
}