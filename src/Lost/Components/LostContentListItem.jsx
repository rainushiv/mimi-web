
import './LostContentListItem'
import LostCatCard from '../UI/LostCatCard'
import { Link } from 'react-router-dom';
export default function LostContentListItem(props) {


    return (

        <li className='Lost-Item'>

            <Link to={`/${props.id}/lostCat`}>
                <LostCatCard name={props.name} id={props.id} place={props.place} image={props.image}></LostCatCard>

            </Link>
        </li>


    );
}