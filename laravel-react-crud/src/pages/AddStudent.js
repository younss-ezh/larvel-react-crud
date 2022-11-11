import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";

// export class AddStudent extends React.Component {

//     state = {
//         fullname: "",
//         city: "",
//         email: "",
//         err_list: []
//     }

//     handelInput = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     createStudent = async (e) => {
//         e.preventDefault() ;
//         const res = await axios.post('http://localhost:8000/api/create-student', this.state)
//         if (res.data.status === 200 ) {

//             Swal({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: res.data.message,
//                 timer: 1500
//               })

//             this.setState({
//                 fullname : "",
//                 city     : "",
//                 email    : "",
//             })
//         }else {
//             this.setState({
//                 err_list: res.data.validate_err
//             })
//         }
//     }

//     render() {
//         return (
            // <div className="container mt-5">
            //     <div className="row">
            //         <div className="col-6">
            //             <div className="card p-3">
            //                 <div className="cart_title">
            //                     <h3>Add New Student
            //                         <Link to="/" className="btn btn-dark btn-sm float-end">Back</Link>
            //                     </h3>
            //                 </div>  
            //                     <div className="card-body">
            //                         <form onSubmit={this.createStudent} className="form-group">
            //                            <div className="input-form-group">
            //                                 <label>Full Name</label>
            //                                 <input type="text" name="fullname" onChange={this.handelInput} value={this.state.fullname} className="form-control" />
            //                                 <span className="text-danger">{this.state.err_list.fullname}</span>
            //                            </div>
            //                            <div className="input-form-group">
            //                                 <label>City</label>
            //                                 <input type="text" name="city" onChange={this.handelInput} value={this.state.city} className="form-control" />
            //                                 <span className="text-danger">{this.state.err_list.city}</span>
            //                            </div>
            //                            <div className="input-form-group">
            //                                 <label>Email</label>
            //                                 <input type="text" name="email" onChange={this.handelInput} value={this.state.email} className="form-control" />
            //                                 <span className="text-danger">{this.state.err_list.email}</span>
            //                            </div>
                                      
            //                            <div className="input-form-group">
            //                                 <button type="submit" className="btn btn-success m-3">Create</button>
            //                            </div>
            //                         </form>

                                
            //                     </div>
            //             </div>
            //         </div>    
            //     </div>
            // </div>
//         )
//     }
// }


export function AddStudent() {
    const [ fullname, setFullname ] = useState('')
    const [ city, setCity ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState({
        err_list: []
    })

    const createStudent = async (e) => {
        e.preventDefault() ;
        const formData = new FormData() ;
        formData.append('_method', 'POST');
        formData.append('fullname', fullname);
        formData.append('city', city);
        formData.append('email', email);

        const res = await axios.post('http://localhost:8000/api/create-student', formData)
        if (res.data.status === 200 ) {

            Swal({
                position: 'top-end',
                icon: 'success',
                title: res.data.message,
                timer: 1500
                })
            
                setFullname("")
                setCity("")
                setEmail("")

        }else {
            setError({
                err_list: res.data.validate_err
            })
        }
    }

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-6">
                <div className="card p-3">
                    <div className="cart_title">
                        <h3>Add New Student
                            <Link to="/" className="btn btn-dark btn-sm float-end">Back</Link>
                        </h3>
                    </div>  
                        <div className="card-body">
                            <form onSubmit={createStudent} className="form-group">
                               <div className="input-form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="fullname" onChange={(e) => setFullname(e.target.value)} value={fullname} className="form-control" />
                                    <span className="text-danger">{error.err_list.fullname}</span>
                               </div>
                               <div className="input-form-group">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" />
                                    <span className="text-danger">{error.err_list.city}</span>
                               </div>
                               <div className="input-form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                                    <span className="text-danger">{error.err_list.email}</span>
                               </div>
                              
                               <div className="input-form-group">
                                    <button type="submit" className="btn btn-success m-3">Create</button>
                               </div>
                            </form>

                        
                        </div>
                </div>
            </div>    
        </div>
    </div>
    )
}