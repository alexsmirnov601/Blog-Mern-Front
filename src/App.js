import Container from '@mui/material/Container'

import { Header } from './components'
import { Home, FullPost, Registration, AddPost, Login } from './pages'
import { Routes, Route, Link } from 'react-router-dom'
import { useGetAuthMeQuery } from './redux/api'
import { useSelector } from 'react-redux'

function App() {
  const { data, isLoading } = useGetAuthMeQuery()
  const isAuth = useSelector((state) => state.auth.isAuth)

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
        <Routes>
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
