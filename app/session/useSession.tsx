import {useContext} from "react"
import {SessionContext} from "./SessionContext"

const useSession = () => {
  const {session, setSession} = useContext(SessionContext)
  return session
}



export default useSession