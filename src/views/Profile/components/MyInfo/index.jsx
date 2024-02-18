import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './MyInfo.module.css';

import { USER_DATA } from '../../../../utils/constants';

const MyInfo = () => {
    const {register, handleSubmit, formState:{ errors }, setValue} = useForm();

    useEffect(()=>{
        try {
            const userData = JSON.parse(localStorage.getItem(USER_DATA));
            setValue('name',userData?.name);
            setValue('email',userData?.email);
            setValue('age',userData?.age);
        } catch (error) {
            console.error(error)
        }
    },[]);

    const handleSubmitForm = (data) => {
        try{
            localStorage.setItem(USER_DATA,JSON.stringify(data))
            alert('Usuario actualizado')
        }catch(error){
            alert('Ha ocurrido un error')
        }
        
    };

    console.log(errors)

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
             <label className={styles.label}>
                Name: 
                <input {...register('name',{required:true, minLength:1, maxLength:120})} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Email: 
                <input {...register('email',{required:true})} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Age: 
                <input {...register('age',{required:true, min:1, max:120, valueAsNumber:true})} 
                    className={styles.input} type='number'/>
            </label>
            <div>
                <button type="submit" className={styles.submitButton}>Save</button>
            </div>
        </form>
    )
};

export default MyInfo;