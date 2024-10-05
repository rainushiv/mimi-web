
import { Link } from 'react-router-dom';
import './HomeContentButtons.css'
export default function HomeContentButtons() {


    return (
        <div className="HomeButton-Container">

            <Link to={'/lost'}> <button className='Home-Buttons'>Lost</button></Link>
            <h2>&</h2>
            <Link to={'/found'}><button className='Home-Buttons'>Found</button></Link>
        </div>

    );
}