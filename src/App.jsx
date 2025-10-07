import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/public/Home'
import Register from './pages/public/Register'
import PublicRouter from './pages/public/PublicRouter'
import UserRouter from './pages/user/UserRouter'
import MemberRouter from './pages/member/MemberRouter'
import ActivityRouter from './pages/activity/ActivityRouter'
import ArchiveRouter from './pages/archive/ArchiveRouter'
import AdminRouter from './pages/admin/AdminRouter'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<PublicRouter />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="/member/*" element={<MemberRouter />} />
      <Route path="/activity/*" element={<ActivityRouter />} />
      <Route path="/archive/*" element={<ArchiveRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
