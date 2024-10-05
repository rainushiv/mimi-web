import { useEffect, useRef, useState } from "react"

import './ImageUpload.css'


export default function ImageUpload(props) {
    const [file, setFile] = useState()

    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const filePickerRef = useRef()

    useEffect(() => {

        if (!file) {
            return;
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)

        }

        fileReader.readAsDataURL(file);

    }, [file])




    const pickedHandler = (event) => {
        let pickedFile
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {

            setIsValid(false)

            fileIsValid = false
        }

        props.onInput(props.id, pickedFile, fileIsValid)

    }

    const pickImageHandler = () => {

        filePickerRef.current.click()
    }

    return (
        <div className="form-control">

            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,jpeg"
                onChange={pickedHandler}
            >
            </input>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="preview" />}

                    {!previewUrl && <p>Please Upload Image</p>}
                </div>
                <div>
                    <button type="button" onClick={pickImageHandler}>Image Upload</button>
                </div>
            </div>
        </div>
    )
}