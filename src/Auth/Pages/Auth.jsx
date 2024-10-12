import useForm from '../../Shared/hooks/FormHook'
import './Auth.css'
import { useContext, useState } from 'react';
import Input from '../../Lost/Components/FormElements/Input';
import Header from "../../Shared/Components/Header"
import LoadingSpinner from '../../Lost/UI/LoadingSpinner';
import useHttpClient from '../../Shared/hooks/HttpHook';
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Lost/Components/util/validators';
import { AuthContext } from '../../Shared/context/authContext';
import { API_URL } from '../../Shared/hooks/config';
import ImageUpload from '../../Shared/Components/ImageUpload';
export default function Auth() {
    const { sendRequest, isError, isLoading, clearError } = useHttpClient()

    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, InputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false
    );
    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            try {

                const responseData = await sendRequest(`${API_URL}/api/user/login`,
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value

                    }),
                    {
                        'Content-Type': 'application/json'
                    })


                auth.login(responseData.user.id, responseData.token);
            } catch (err) { }
        } else {

            try {
                const formData = new FormData()
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.username.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.img.value)
                const responseData = await sendRequest(`${API_URL}/api/user/signup`,
                    'POST',
                    formData
                )


                auth.login(responseData.userId, responseData.token);
                console.log(responseData.token)
            } catch (err) {

            }

        }
    }
    const switchModeHandler = () => {

        if (!isLoginMode) {

            setFormData({
                ...formState,
                username: undefined

            }, formState.inputs.email.isValid && formState.inputs.password.isValid

            )
        } else {

            setFormData({
                ...formState.inputs,
                username: {
                    value: '',
                    isValid: false
                }

            }, false)
        }

        setIsLoginMode(prevMode => !prevMode)
    }
    return (

        <>
            <Header></Header>
            <div className="authform_container">
                {isLoading && <LoadingSpinner asOverLay />}
                <form onSubmit={authSubmitHandler}>

                    {!isLoginMode && <ImageUpload center id='img' onInput={InputHandler} />}
                    {!isLoginMode && <Input
                        id='username'
                        element='input'
                        type='text'
                        label='Username'
                        validators={[VALIDATOR_REQUIRE]}
                        onInput={InputHandler}
                    >

                    </Input>}
                    <Input id='email'
                        element='input'
                        type='text'
                        label='Email'
                        validators={[VALIDATOR_EMAIL()]}
                        errorText='YO THIS WONT CUT IT'
                        onInput={InputHandler}>
                    </Input>

                    <Input
                        id='password'
                        element='input'
                        type='text'
                        label='Password'
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText='YO THIS WONT CUT IT'
                        onInput={InputHandler}

                    ></Input>

                    {isError && <p>{isError}</p>}
                    <button type='submit' disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Signup'}</button>
                </form>

                <button onClick={switchModeHandler}>{isLoginMode ? "Haven't Signed Up? " : "Already Signed Up?"}</button>
            </div >
        </>
    )
}
