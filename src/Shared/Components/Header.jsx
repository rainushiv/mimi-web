
import { Link } from 'react-router-dom';
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
export default function Header() {
    const auth = useContext(AuthContext)


    return (

        <nav className="nav-container">

            <Link className='nav-brand' to={'/home'}>Mimi</Link>


            <ul className='nav-list'>

                <li>
                    <Link to={'/lost'}>Lost Cats</Link>
                </li>
                {auth.isLoggedIn && <li>
                    <Link to={'/newlostcat'}>Add Lost Cat</Link>
                </li>}
                {!auth.isLoggedIn ? <li>

                    <Link to={'/auth'}>Login/Signup</Link>
                </li> : <li>

                    <Link to={`/${auth.userId}/profile`}>Profile</Link>
                </li>}




            </ul>
        </nav>

    );

}