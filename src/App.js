
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ProfilePage from './Components/ProfilePage';
import Login from './Components/Login';

function App() {

  window.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  window.indianPhoneNumberRegex = /^[6-9]\d{9}$/;
  window.nameRegex = /^[A-Za-z ]+$/;

  return (
    <>
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/profile/:id' exact element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


