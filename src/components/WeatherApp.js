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

    useEffect(() => {
        if (weather) {
          setErrorMessage('');
        }
      }, [weather]);

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ''}`
    },[weather]);

    async function loadInfo(city = 'london'){
        try {
            const request = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
            );
            const json = await request.json();
            
            if (json.error) {
                setErrorMessage(json.error.message);
            } else {
                setTimeout(() => {
                    setWeather({ ...json });
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error al cargar la información del clima. Por favor, intenta de nuevo más tarde.");
        }
    }
    

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }
    return (
    <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {errorMessage && <p>{errorMessage}</p>}
        {weather ? <WeatherMainInfo setErrorMessage={''} weather={weather} /> : <Loading/> }
    </div>
    )
}