import Input from "../Components/FormElements/Input";
import Header from "../../Shared/Components/Header";
import { VALIDATOR_REQUIRE } from "../Components/util/validators";
import { useCallback, useReducer, useEffect, useState, useContext } from "react";
import useHttpClient from "../../Shared/hooks/HttpHook";
import useForm from "../../Shared/hooks/FormHook";
import LoadingSpinner from "../UI/LoadingSpinner";
import { AuthContext } from "../../Shared/context/authContext";
import ImageUpload from "../../Shared/Components/ImageUpload";
import './NewLostCat.css'

export default function NewLostCat() {
    const auth = useContext(AuthContext)
    const { sendRequest, isError, isLoading, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            }, place: {
                value: '',
                isValid: false
            }
        }, false
    )




    const lostCatSubmitHandler = async event => {

        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value)
            formData.append('place', formState.inputs.place.value)
            formData.append('creator', auth.userId)
            formData.append('image', formState.inputs.img.value)

            await sendRequest('http://localhost:4000/api/lost/addlostcat',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token })

        } catch (err) { }

    }






    return (
        <>
            <Header></Header>
            <div className="lostcatform_container">
                {isLoading && <LoadingSpinner asOverLay />}
                <form onSubmit={lostCatSubmitHandler}>
                    <ImageUpload center id='img' onInput={inputHandler}></ImageUpload>
                    <Input
                        id='name'
                        element='input'
                        type='text'
                        label='Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='YO THIS WONT CUT IT'
                        onInput={inputHandler}
                    ></Input>
                    <Input
                        id='place'
                        element='input'
                        type='text'
                        label='Place'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='YO THIS WONT CUT IT'
                        onInput={inputHandler}
                    ></Input>
                    <button type="submit" disabled={!formState.isValid}>
                        Add Cat
                    </button>
                </form>


            </div >
        </>
    );

}