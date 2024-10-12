import { useContext } from "react"
import { AuthContext } from "../../Shared/context/authContext"
import { API_URL } from "../../Shared/hooks/config"
export default function UserInfoContainer({ user }) {

    const auth = useContext(AuthContext)

    return (

        <div>
            <img src={`${API_URL}/${user.image}`} alt="image" />
            <button onClick={auth.logout}>Logout</button>

        </div>
    )
}