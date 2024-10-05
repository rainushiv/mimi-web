import { useState } from "react"
import { ReactDOM } from "react"
import { createPortal } from 'react-dom'
import './modal.css'

const confirmDeleteHandler = () => {


}

export default function DeleteModal({ isOpen, onCancel, onConfirmDelete }) {

    if (!isOpen) return null
    return (

        createPortal(
            <div className="modal">

                <div onClick={onCancel} className="overlay">
                    <div className="modal-content">
                        <header className="modal-header">
                            <h1>Are you Sure?</h1>
                        </header>
                        <p> Do you really want to remove this cat?</p>
                        <div>
                            <button onClick={onConfirmDelete}>delete</button>

                            <button>cancel</button>
                        </div>


                    </div>
                </div>
            </div>,
            document.getElementById('portal')


        )

    )

}

