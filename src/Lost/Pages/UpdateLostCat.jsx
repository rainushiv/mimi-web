import Header from "../../Shared/Components/Header"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Input from "../Components/FormElements/Input"
import { VALIDATOR_REQUIRE } from "../Components/util/validators"
import useForm from "../../Shared/hooks/FormHook"
import useHttpClient from "../../Shared/hooks/HttpHook"
import './UpdateLostCat.css'
import LoadingSpinner from "../UI/LoadingSpinner"
import { useContext } from "react"
import { AuthContext } from "../../Shared/context/authContext"
import { API_URL } from "../../Shared/hooks/config"

export default function UpdateLostCat() {
    const auth = useContext(AuthContext)
    const { sendRequest, isError, isLoading, clearError } = useHttpClient()

    const [loadedCat, setLoadedCat] = useState()

    const lostCatId = useParams().pid

    const navigate = useNavigate()


    const [formState, inputHandler, setFormData] = useForm(

        {
            name: {
                value: '',
                isValid: false
            },
            place: {
                value: '',
                isValid: false
            }
        },
        false
    )


    useEffect(() => {

        const fetchCat = async () => {
            try {

                const responseData = await sendRequest(`${API_URL}/api/lost/${lostCatId}`)

                setLoadedCat(responseData.lostCat)

                setFormData(
                    {
                        name: {
                            value: responseData.lostCat.name,
                            isValid: true
                        },
                        place: {
                            value: responseData.lostCat.place,
                            isValid: true
                        }

                    }, true)



            } catch (err) { }

        }

        fetchCat();
    }, [sendRequest, lostCatId, setFormData])
    const lostCatUpdateHandler = async event => {
        event.preventDefault();

        await sendRequest(`${API_URL}/api/lost/${lostCatId}`,
            'PATCH',
            JSON.stringify({
                name: formState.inputs.name.value,
                place: formState.inputs.place.value
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        )

        navigate('/' + auth.userId + '/profile')
    }
    return (
        <>
            <Header></Header>
            {!loadedCat ? <div className="updateform-container"><p>no cat found</p></div> :

                <div className="updateform-container">
                    {isLoading ? <LoadingSpinner /> :
                        <form onSubmit={lostCatUpdateHandler}>
                            <Input
                                id='name'
                                element='input'
                                type='text'
                                label='Name'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='YO THIS WONT CUT IT'

                                value={formState.inputs.name.value}
                                valid={formState.inputs.name.isValid}
                                onInput={inputHandler}
                            ></Input>
                            <Input
                                id='place'
                                element='input'
                                type='text'
                                label='Place'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='YO THIS WONT CUT IT'
                                value={formState.inputs.place.value}
                                valid={formState.inputs.place.isValid}
                                onInput={inputHandler}
                            ></Input>
                            <button type="submit" disabled={!formState.isValid}>Update Cat</button>
                        </form>}
                </div>

            }


        </>
    )
}
