import { CreateVoting, Home, ViewVotings, CreatePetition, PetitionPage } from '../pages'
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
    path: '/View-Votings',
    Component: ViewVotings,
    name: 'ViewVotings',
  },
  {
    path: '/login',
    Component: Login,
    name: 'Login',
  },
  {
    path: '/Create-Petition',
    Component: CreatePetition,
    name: 'CreatePetition',
  },
  {
    path: '/petition/:id', // dynamic ID
    Component: PetitionPage,
    name: 'PetitionPage',
  },
]
