import LostContentListItem from './LostContentListItem';
import './LostContentList.css';
export default function LostContentList(props) {

    return (
        <div className='LostContentList-Container'>
            <h1>Lost Cats</h1>
            <div className='LostList'>

                <ul className='LostContent-List'>
                    {props.items.map(lostCat => {
                        return <LostContentListItem key={lostCat.id} name={lostCat.name} place={lostCat.place} id={lostCat.id} image={lostCat.image}></LostContentListItem>
                    })}


                </ul>
            </div>

        </div>
    );
}