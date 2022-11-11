import { Routes, Route } from 'react-router-dom' ;
import { Students } from './pages/Students' ;
import { AddStudent } from './pages/AddStudent' ;
import { EditStudent } from './pages/EditStudent';
import { ShowStudent } from './pages/ShowStudent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Students />}/>
      <Route path="/addStudent" element={<AddStudent />}/>
      <Route path="/editStudent/:id" element={<EditStudent />}/>
      <Route path="/showStudent/:id" element={<ShowStudent />}/>
    </Routes>
  )
}

export default App;
