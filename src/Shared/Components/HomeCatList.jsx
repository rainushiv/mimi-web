import { useState } from "react";
import HomeLostCatItem from "../../Home/Components/HomeLostCatItem";
import './HomeCatList.css'

export default function HomeCatList(props) {
    const image = 'https://www.google.com/imgres?q=cat%20image%20url&imgurl=https%3A%2F%2Fwww.jesuitroundup.org%2Fwp-content%2Fuploads%2F2018%2F01%2Ftabby-cat-names.jpg&imgrefurl=https%3A%2F%2Fgithub.com%2Fiblh%2Fnot-cat%2Fblob%2Fmaster%2Furls%2Fcat%2Fcat-urls.txt&docid=i6EX_7Axtk-bIM&tbnid=VqEttcy-cMfGbM&vet=12ahUKEwiuiPPrzfyHAxX1tokEHT0vN7cQM3oECBgQAA..i&w=800&h=440&hcb=2&ved=2ahUKEwiuiPPrzfyHAxX1tokEHT0vN7cQM3oECBgQAA'

    return (

        <div className="cat-feed">

            <h2 className="feed-title"> Latest Cat Feed</h2>
            <div className="feed-list">
                {props.isEmpty && <p>An Error occured</p>}
                <ul className="home-list">

                    {props.items.map(lostCat => {
                        return <HomeLostCatItem key={lostCat.id} id={lostCat.id} place={lostCat.place} name={lostCat.name} image={lostCat.image} />
                    })}
                </ul>
            </div>
        </div>


    );
}