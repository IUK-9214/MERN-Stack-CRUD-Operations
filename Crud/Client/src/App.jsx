import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './components/User'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'

function App() {


  return (
    <>
    <BrowserRouter>
   <Routes>
<Route path='/' element={<User/>}/>
<Route path='/create' element={<CreateUser/>}/>
<Route path='/Update/:id' element={<UpdateUser/>}/>
   </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
