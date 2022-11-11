import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert";


// export class Students extends React.Component {

//     state = {
//         students: [],
//         loading: true
//     }


//     async componentDidMount() {
//         const res = await axios.get('http://localhost:8000/api/all-student') ;
//         if(res.data.status === 200) {
//             this.setState({
//                 students: res.data.students,
//                 loading: false
//             })
//         }
//     }

//     deleteStudent = async (e, id) => {

//         const thisClicked = e.currentTarget ;
//         thisClicked.innertext = "Deleting"
//         const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`)
//         if (res.data.status === 200) {
//             thisClicked.closest("tr").remove()
//             Swal({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: res.data.message,
//                 timer: 1500
//               })
//         }
//     }


//     render() {

//         var Html_Table_map = ""

//         if(this.state.loading){
//             Html_Table_map = <tr><td colSpan={4}><h2 className="text-center">Loading...</h2></td></tr>
//         }else {
//             Html_Table_map = this.state.students.map((item) => {
//                 return (
//                     <tr key={item.id}>
//                         <td>{item.fullname}</td>
//                         <td>{item.city}</td>
//                         <td>{item.email}</td>
//                         <td>
//                             <Link to={`/showStudent/${item.id}`} className="btn btn-warning me-2">Show</Link>
//                             <Link to={`/editStudent/${item.id}`} className="btn btn-primary me-2">Edit</Link>
//                             <button className="btn btn-danger" onClick={(e) => this.deleteStudent(e, item.id)}>Delete</button>
//                         </td>
//                     </tr>
//                 )
//             })
//         }

//         return (
//             <div className="container mt-5">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card p-3">
//                             <div className="cart-title">
//                                 <h3>Students Table
//                                     <Link to="/addStudent" className="btn btn-primary float-end">Add New Student</Link>
//                                 </h3>
//                             </div>  
//                                 <div className="card-body">
//                                    <table className="table table-hover table-striped">
//                                     <thead>
//                                         <tr>
                                           
//                                             <th>Full Name</th>
//                                             <th>City</th>
//                                             <th>Email</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>

//                                     <tbody>

//                                         {Html_Table_map}

//                                     </tbody>
                                
//                                    </table>
//                                 </div>
//                         </div>
//                     </div>    
//                 </div>
//             </div>
//         )
//     }
// }


export function Students() {
    const [ students, setStudents ] = useState([])
    const [ load, setLoad ] = useState(true)

    useEffect(() =>{
        getStudentData()
    }, [])

    const getStudentData = async () => {
        const res = await axios.get('http://localhost:8000/api/all-student') ;
        if(res.data.status === 200) {
            setStudents(res.data.students)
            setLoad(false)
        }
    }

    var Html_Table_map = ""

    if(load){
        Html_Table_map = <tr><td colSpan={4}><h2 className="text-center">Loading...</h2></td></tr>
    }else {
        Html_Table_map = students.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.fullname}</td>
                    <td>{item.city}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`/showStudent/${item.id}`} className="btn btn-warning me-2">Show</Link>
                        <Link to={`/editStudent/${item.id}`} className="btn btn-primary me-2">Edit</Link>
                        <button onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }


    const deleteStudent = async (e, id) => {
        const thisClicked = e.currentTarget ;
            thisClicked.innertext = "Deleting"
            const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`)
            if (res.data.status === 200) {
                thisClicked.closest("tr").remove()
                Swal({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    timer: 1500
                    })
            }
    }

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-12">
                <div className="card p-3">
                    <div className="cart-title">
                        <h3>Students Table
                            <Link to="/addStudent" className="btn btn-primary float-end">Add New Student</Link>
                        </h3>
                    </div>  
                        <div className="card-body">
                           <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                   
                                    <th>Full Name</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {Html_Table_map}

                            </tbody>
                        
                           </table>
                        </div>
                </div>
            </div>    
        </div>
    </div>
    )
}