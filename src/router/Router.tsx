import { Route, Routes } from 'react-router'
import { routes } from './routes'

export const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route element={<route.Component />} path={route.path} key={index} />
      ))}
    </Routes>
  )
}
