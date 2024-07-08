import { useState } from 'react';
import './LostForm.css'
export default function LostForm() {

    const [enteredName, setEnteredName] = useState("")
    const [enteredPlace, setEnteredPlace] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        const name = enteredName.trim();
        const place = enteredPlace.trim();
        if (name && place) {
            fetch('http://localhost:4000/addlostcat', {
                method: "POST",
                body: JSON.stringify({
                    name,
                    place,
                }),
                headers: {
                    "Content-type": "application/json; cahrset=UTF-8"
                },
            })
                .then(response => console.log(response.json))


        }
        console.log(title, name);
    }

    return (
        <form onSubmit={handleSubmit} className="lostForm">
            <h2 className='form-title'>We are here to help!</h2>
            <p className='form-subtitle'>We just need some information about your friend first</p>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="Cat Name">Cat Name</label>
                    <input type="text" id="cat-name" name="cat-name" onChange={e => setEnteredName(e.target.value)} value={enteredName} />
                </div>

                <div className="control">
                    <label htmlFor="Place Lost">Place Lost</label>
                    <input type="text" id="Place-Lost" name="Place-Lost" onChange={e => setEnteredPlace(e.target.value)} value={enteredPlace} />
                </div>
            </div>
            <button className='submitButton' type='submit'>Submit</button>
        </form >
    )
}