import { Link } from 'react-router-dom'
import './LostContentButton.css'
export default function LostContentButton() {

    return (

        <div className="LostButton-Container">

            <Link to={'/newlostcat'}> <button className='Lost-Button'>Lost Your Cat?</button></Link>
        </div>
    )
}