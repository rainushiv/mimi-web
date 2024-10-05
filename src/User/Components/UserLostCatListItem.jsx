import { Link } from 'react-router-dom'
import UserLostCatCard from './UserLostCatCard'
export default function UserLostCatListItem(props) {


    return (

        <li>
            <UserLostCatCard name={props.name} id={props.id} place={props.place} image={props.image} onDelete={props.onDelete}></UserLostCatCard>
        </li>
    )
}