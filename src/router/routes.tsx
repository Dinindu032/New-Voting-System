import { Home, ViewVotings, CreatePetition, PetitionPage } from '../pages'
import CreateVoting from '../pages/CreateVoting'
import { Login } from '../pages/Login'
import { VoteNow } from '../pages/VoteNow'
import CastVoting from '../pages/CastVoting'

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
    path: '/petitions/:id', // dynamic ID
    Component: PetitionPage,
    name: 'PetitionPage',
  },
  {
    path: '/Vote-Now', // dynamic ID
    Component: VoteNow,
    name: 'VoteNow',
  },
  {
    path: '/CastVoting/:uniqueId', // dynamic ID
    Component: CastVoting,
    name: 'CastVoting',
  },
  {
    path: '/Cast-Voting/:uniqueId', // dynamic ID
    Component: CastVoting,
    name: 'CastVoting',
  },
]
