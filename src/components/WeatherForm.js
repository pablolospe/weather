import { useState } from "react";
import styles from './WeatherForm.module.css'

export default function WeatherForm({onChangeCity}){
    const [city, setCity] = useState('');

    function handleChange(e){
        const value = e.target.value;
        if(value !== ''){
            setCity(value)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!city || city !== "") {
            onChangeCity(city);
          }
    }

    return <form onSubmit={handleSubmit} className={styles.container}>
        <input type='text' onChange={handleChange} className={styles.input} />
    </form>
}