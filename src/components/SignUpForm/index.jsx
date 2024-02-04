import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    
    const handleClearClick = () => {
        reset();
    };

    const handleSubmitForm = (data) => {
        event.preventDefault()
        console.log(data)
    };

    console.log(errors)

    return(
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <label>
                Name: 
                <input {...register('name',{required:true})}/>
            </label>
            <br></br>
            <label>
                Age: 
                <input {...register('age',{required:true})}/>
            </label>
            <br></br>
            <label>
                Address: 
                <input {...register('address',{required:true})}/>
            </label>
            <br></br>
            <label>
                Zipcode: 
                <input {...register('zipCode',{required:true})} />
            </label>
            <br></br>
            <label>
                Phone: 
                <input {...register('phone',{required:true})} />
            </label>
            <div>
                <button type="button" onClick={handleClearClick}>Limpiar</button>
                <button type="submit">Enviar</button>
            </div>
        </form>
    )
}
export default SignUpForm;