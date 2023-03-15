import { useEffect, useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherMainInfo from './WeatherMainInfo';
import Loading from './Loading';
import styles from './WeatherApp.module.css'

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        loadInfo();
    },[]);

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ''}`
    },[weather]);

    async function loadInfo(city = 'london'){
        try {
            const request = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
                );

                const json = await request.json();

                setTimeout(() => {
                    setWeather({ ...json });
                  }, 2000);
 
        } catch (error) {
            setErrorMessage("que tipeaste papá?")
        }
    }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }
    return (
    <div className={styles.weatherContainer}>
        {errorMessage && <p>{errorMessage}</p>}
        <WeatherForm onChangeCity={handleChangeCity} />
        {console.log(weather)}
        {weather ?  <WeatherMainInfo weather={weather} /> : <Loading/>}
    </div>
    )
}