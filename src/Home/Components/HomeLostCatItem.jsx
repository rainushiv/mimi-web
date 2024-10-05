import RowCard from "../UI/HomeCard";
import { Link } from "react-router-dom";
import './HomeLostCatItem.css'
export default function LostCatItem({ id, name, place, image }) {

    return (

        <li className="LostCat-Item">
            <Link to={'/lost'}>

                <RowCard name={name} id={id} place={place} image={image}></RowCard>
            </Link>
        </li>

    );


}