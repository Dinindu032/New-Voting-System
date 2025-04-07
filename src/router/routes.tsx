import { CreateVoting, Home, ViewVotings } from '../pages'
import { Login } from '../pages/Login'

export const routes = [
  {
    path: '/',
    Component: Home,
    name: 'Home',
  },
  {
    path: '/create-voting',
    Component: CreateVoting,
    name: 'CreateVoting',
  },
  {
    path: '/view-votings',
    Component: ViewVotings,
    name: 'ViewVotings',
  },
  {
    path: '/login',
    Component: Login,
    name: 'Login',
  },
]
