import styles from './Weather.module.scss'
import {Card}from "react-bootstrap";
import PositionSvg from "../../assets/img/Svgs/PositionSvg";
import DefaultWeather from "../../assets/img/Svgs/DefaultWeather";
import Thermometer from "../../assets/img/Svgs/Thermometer";
import Time from "../../assets/img/Svgs/Time";
import Wind from "../../assets/img/Svgs/Wind";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Switch } from '@mui/material';
import Sunny from "../../assets/img/Svgs/Sunny";
import Cloudy from "../../assets/img/Svgs/Cloudy";
import Rainy from "../../assets/img/Svgs/Rainy";

export const Weather = () => {
    const defaultWidth = '200px';
    const defaultHeight = '200px';
    const weather  = useSelector(({weather})=>weather)

    const displayIcon =  () => {

      const number =  weather.weather.icon.substring(0,2);

       switch (number) {

        case '01': 
            return <Sunny/>      
        case '04':
            return <Cloudy width={defaultWidth} height={defaultHeight}/>
        case '10':
            return <Rainy width={defaultWidth} height={defaultHeight}/>
        default:
            return <img src={`https://openweathermap.org/img/wn/${weather.weather.icon || '10d'}@2x.png`} alt=""/>
        
       }

    }

    return (
        <>
        {JSON.stringify(weather)}
            <Card className={styles.container}>
              {!weather.isLoaded ?  <Card.Body>
                    <Card.Title >
                    <span className="mb-4">
                       {weather.name ||' Casablanca , MA '} {weather.sys.country ||' Morocco  '} 
                    </span>
                        <div className={`${styles.date} mt-3` } >
                            <div>
                                <Moment unix={true} format='hh:mm'>
                                    {weather.sys.sunrise}
                                </Moment>
                            </div>
                            <div><Time width={'15px'} height={'15px'}/></div>
                        </div>
                    </Card.Title>
                    <Switch />
                    <Card.Text as={'div'} className={styles.weather_infos}>
                        <div>                 
                                {displayIcon()}
                        </div>
                        <div className={styles.temperature}>
                            <div>{weather.main.feels_like || '35 C°'}</div>
                            <div>
                                <Thermometer/>
                            </div>
                        </div>
                        <div>
                            Good Morning {weather.name ||' Casablanca '} 
                            <div className={styles.separator}></div>
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                <div>08:00</div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Wind/></div>
                                <div>{weather.wind.speed ||' 25Km/h '} </div>
                                <div>08m/s</div>
                            </div>
                            <div>
                                <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                <div>Temp</div>
                                <div>{weather.main.feels_like || '35 C°'}</div>
                            </div>
                        </div>

                    </Card.Text>
                </Card.Body>:
                <Card>
                    <Card.Body>
                        <Card.Title>Please Select A City</Card.Title>
                    </Card.Body>
                </Card>
                    }
            </Card>
        </>
    )
}
export default Weather