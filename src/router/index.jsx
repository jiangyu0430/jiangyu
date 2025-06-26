import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Notes from '../pages/Notes'
import About from '../pages/About'
import ProjectDetail from '../pages/ProjectDetail'

export default function AppRouter({ location }) {
  const routes = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <Projects /> },
      { path: '/notes', element: <Notes /> },
      { path: '/about', element: <About /> },
      { path: '/project/:slug', element: <ProjectDetail fullscreen /> },
    ],
    location
  )
  return routes
}
