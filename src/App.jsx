import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/nav/Navbar'
import DataDelete from './pages/DataDelete'
import DataShow from './pages/DataShow'
import DataStore from './pages/DataStore'
import DataUpdate from './pages/DataUpdate'
import FileUpload from './pages/FileUpload'
import FileUploadHook from './pages/FileUploadHook'
import RegisterPage from './pages/RegisterPage'
import UploadDelete from './pages/UploadDelete'
import UploadFetch from './pages/UploadFetch'
function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/view" element={<DataShow/>} />
          <Route path="/add" element={<DataStore/>} />
          <Route path="/delete" element={<DataDelete/>} />
          <Route path="/update" element={<DataUpdate/>} />
          <Route path="/upload" element={<FileUpload/>} />
          <Route path="/uploadhook" element={<FileUploadHook/>} />
          <Route path="/uploadfetch" element={<UploadFetch/>} />
          <Route path="/uploaddelete" element={<UploadDelete/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
