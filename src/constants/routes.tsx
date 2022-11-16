import { BiSliderAlt, BiFootball } from 'react-icons/bi'
import { MdOutlineDashboard } from 'react-icons/md'
import { AiOutlineTrophy } from 'react-icons/ai'
import { FaDice } from 'react-icons/fa'

const iconStyles = 'text-white text-2xl'

export const userRoutes = [
  {
    path: '/inicio',
    icon: <MdOutlineDashboard className={iconStyles} />,
    name: 'Home'
  },
  {
    path: '/partidos',
    icon: <BiFootball className={iconStyles} />,
    name: 'Games'
  },
  {
    path: '/mis-pronosticos',
    icon: <FaDice className={iconStyles}/>,
    name: 'My Bets'
  },
  {
    path: '/clasificatoria',
    icon: <AiOutlineTrophy className={iconStyles} />,
    name: 'Leaderboard'
  },
  {
    path: '/configuracion',
    icon: <BiSliderAlt className={iconStyles} />,
    name: 'Settings'
  },
]
