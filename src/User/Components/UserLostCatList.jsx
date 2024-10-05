import UserLostCatListItem from '../Components/UserLostCatListItem'
import './UserLostCatList.css'
export default function UserLostCatList(props) {


    return (

        <div className='user-listContainer'>

            <ul className='user-catList'>

                {props.items.map(lostCat => {
                    return <UserLostCatListItem onDelete={props.onDelete} key={lostCat.id} id={lostCat.id} place={lostCat.place} name={lostCat.name} image={lostCat.image}></UserLostCatListItem>
                })}
            </ul>




        </div>

    )
}