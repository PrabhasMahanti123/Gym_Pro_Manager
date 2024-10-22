import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from 'react-redux'
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Profile from './pages/doctor/Profile';
import BookPage from './pages/BookPage';
import Appointments from './pages/Appointments';
import ApplySlot from './pages/ApplySlot';
import SlotCreation from './pages/admin/SlotCreation';
import BookingConfirmation from './pages/BookingConfirmation';
import Slot from './pages/admin/Slot';
import recom from './pages/recom';


function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
  <>
  <BrowserRouter>
  {loading ? (<Spinner />) :(
  <Routes>
    <Route path='/' 
    element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
    } 
    />
    
    <Route path='/apply-slot' 
    element={
    <ProtectedRoute>
      <ApplySlot />
    </ProtectedRoute>
    } 
    />
    <Route path='/booking-confirmation' 
    element={
    <ProtectedRoute>
      <BookingConfirmation />
    </ProtectedRoute>
    } 
    />
    <Route path='/recom' 
    element={
    <ProtectedRoute>
      <recom />
    </ProtectedRoute>
    } 
    />
    <Route path='/admin/users' 
    element={
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
    } 
    />
    
    <Route path='/admin/create-slot' 
    element={
    <ProtectedRoute>
      <SlotCreation />
    </ProtectedRoute>
    } 
    />
    <Route path='/admin/see-people' 
    element={
    <ProtectedRoute>
      <Slot />
    </ProtectedRoute>
    } 
    />
    <Route path='/doctor/profile/:id' 
    element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
    } 
    />
    <Route path='/doctor/book-appointment/:doctorId' 
    element={
    <ProtectedRoute>
      <BookPage />
    </ProtectedRoute>
    } 
    />
    <Route path='/notification' 
    element={
    <ProtectedRoute>
      <NotificationPage />
    </ProtectedRoute>
    } 
    />
    <Route path='/login' element={
      <PublicRoute>
        <Login />
      </PublicRoute>      
      } />
    <Route path='/register' element={
      <PublicRoute>
        <Register />
      </PublicRoute>
      } />

    <Route path='/appointments' element={
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
      } />

  </Routes>
)}
  </BrowserRouter>


  </>
  );
}

export default App;