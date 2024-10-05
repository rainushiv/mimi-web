import { useContext } from 'react'
import './LostPageListItem'
import './LostPageListItem.css'
import { AuthContext } from '../../Shared/context/authContext'

export default function LostPageListItem({ items }) {
    const auth = useContext(AuthContext)

    return (

        <li>

            <div className='lostcatpage-container'>
                <div className='LostCatImage-Container'>
                    <img className='' src={`http://localhost:4000/${items.image}`}
                        alt="" />
                </div>
                <div className='LostCatDesc-Container'>
                    <h1>{items.name}</h1>
                    <hr></hr>
                    <h3>{items.place}</h3>
                    <h3>fuck u</h3>

                </div>

            </div>
        </li>
    )
}