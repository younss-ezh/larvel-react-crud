import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";

// export class EditStudent extends React.Component {

//     state = {
//         fullname: '',
//         city: '',
//         email: ''
//     }

//     handelInput = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     async componentDidMount() {
//         const student_id = this.props.match.params.id
//         const res = await axios.get(`http://localhost:8000/api/edit-student/${student_id}`)
//         if(res.data.satus === 200) {
//             this.setState({
//                 fullname: res.data.student.fullname,
//                 city: res.data.student.city,
//                 email: res.data.student.email,
//             })
//         }
//     }

//     render() {
//         return (
//             <div className="container mt-5">
//                 <div className="row">
//                     <div className="col-6">
//                         <div className="card p-3">
//                             <div className="cart_title">
//                                 <h3>Edit Student
//                                     <Link to="/" className="btn btn-dark btn-sm float-end">Back</Link>
//                                 </h3>
//                             </div>  
//                                 <div className="card-body">
//                                     <form onSubmit={this.updateStudent} className="form-group">
//                                        <div className="input-form-group">
//                                             <label>Full Name</label>
//                                             <input type="text" name="fullname" onChange={this.handelInput} value={this.state.fullname} className="form-control" />
//                                        </div>
//                                        <div className="input-form-group">
//                                             <label>City</label>
//                                             <input type="text" name="city" onChange={this.handelInput} value={this.state.city} className="form-control" />
//                                        </div>
//                                        <div className="input-form-group">
//                                             <label>Email</label>
//                                             <input type="text" name="email" onChange={this.handelInput} value={this.state.email} className="form-control" />
//                                        </div>
                                      
//                                        <div className="input-form-group">
//                                             <button type="submit" className="btn btn-primary m-3">Update</button>
//                                        </div>
//                                     </form>

                                
//                                 </div>
//                         </div>
//                     </div>    
//                 </div>
//             </div>
//         )
//     }
// }


export function EditStudent() {
    const [ fullname, setFullname ] = useState('')
    const [ city, setCity ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState({
        error_list: []
    })
    
    const params = useParams()

    useEffect(() => {
        editStudent()
    }, [])

    const editStudent = async () => {
        const student_id = params.id
        const res = await axios.get(`http://localhost:8000/api/edit-student/${student_id}`)
         if(res.data.status === 200) {
            setFullname(res.data.student.fullname)
            setCity(res.data.student.city)
            setEmail(res.data.student.email)
         }
    }
    
    const updateStudent = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PUT');
        formData.append('fullname', fullname)
        formData.append('city', city)
        formData.append('email', email)
    
        const student_id = params.id
        const res = await axios.post(`http://localhost:8000/api/update-student/${student_id}`, formData)
         if(res.data.status === 200) {
             Swal({
                position: 'top-end',
                icon: 'success',
                title: res.data.message,
                timer: 1500
              })
         }else if(res.data.status === 404) {
            // this.props.history.push('/') ;
            Swal({
                position: 'top-end',
                icon: 'error',
                title: res.data.message,
                timer: 1500
              })
         }else {
            setError({
                error_list: res.data.validate_err
            })
         }
    }

    return (
        <div className="container mt-5">
                 <div className="row">
                     <div className="col-6">
                         <div className="card p-3">
                             <div className="cart_title">
                                 <h3>Edit Student
                                     <Link to="/" className="btn btn-dark btn-sm float-end">Back</Link>
                                 </h3>
                             </div>  
                                 <div className="card-body">
                                     <form onSubmit={updateStudent} className="form-group">
                                        <div className="input-form-group">
                                             <label>Full Name</label>
                                             <input type="text" name="fullname" onChange={(e) => setFullname(e.target.value)} value={fullname} className="form-control" />
                                             <span className="text-danger">{error.error_list.fullname}</span>
                                        </div>
                                        <div className="input-form-group">
                                             <label>City</label>
                                             <input type="text" name="city" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" />
                                             <span className="text-danger">{error.error_list.city}</span>
                                        </div>
                                        <div className="input-form-group">
                                             <label>Email</label>
                                             <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                                             <span className="text-danger">{error.error_list.email}</span>
                                        </div>
                                      
                                        <div className="input-form-group">
                                             <button type="submit" id="btn-update" className="btn btn-primary m-3">Update</button>
                                        </div>
                                     </form>

                                
                                 </div>
                         </div>
                     </div>    
                 </div>
             </div>
    )
}