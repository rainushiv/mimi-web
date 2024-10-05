import { useContext } from "react"
import { AuthContext } from "../../Shared/context/authContext"
export default function UserInfoContainer({ user }) {

    const auth = useContext(AuthContext)

    return (

        <div>
            <img src={`http://localhost:4000/${user.image}`} alt="image" />
            <button onClick={auth.logout}>Logout</button>

        </div>
    )
}