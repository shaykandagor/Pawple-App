import { useContext } from 'react'
import { SessionContext } from './SessionContext'

const useSession = () => {
  const { session, setSession, logOut } = useContext(SessionContext)
  return { session, setSession, logOut }
}

export default useSession
