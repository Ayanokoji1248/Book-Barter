
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainLayout from './layout/MainLayout'
import BrowsePage from './pages/BrowsePage'

import { RequestPage } from './pages/RequestPage'
import RequestReceived from './pages/RequestReceived'
import RequestMade from './pages/RequestMade'
import AddBookPage from './pages/AddBookPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProfilePage from './pages/ProfilePage'
import BookPage from './pages/BookPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path='/browse' element={<BrowsePage />} />
          <Route path='/add' element={
            <ProtectedRoutes>
              <AddBookPage />
            </ProtectedRoutes>

          } />
          <Route path='/requests' element={
            <ProtectedRoutes>
              <RequestPage />
            </ProtectedRoutes>

          } >
            <Route path='received' element={
              <ProtectedRoutes>
                <RequestReceived />
              </ProtectedRoutes>
            } />
            <Route path='made' element={
              <ProtectedRoutes>
                <RequestMade />
              </ProtectedRoutes>
            } />
          </Route>
          <Route path='/profile' element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          } />


          {/* Add Protected Routes Here */}
          <Route path='/book/:id' element={<BookPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App