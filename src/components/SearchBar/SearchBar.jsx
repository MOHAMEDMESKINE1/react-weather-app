import { Button, Form } from "react-bootstrap";
import styles from './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetData, setData } from "../../features/weather/weatherSlice";
const SearchBar = () => {
    const [cities,setCities] = useState([])
    const [unity,setUnity] = useState(['metric'])
    const dispatch = useDispatch();
    
    const handleChange = (e) =>{
     const {value} =   e.currentTarget;
          
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=20961cfa95c94beca7d00fb1d9e71b69`)
        .then(response => response.json())

        .then(json =>setCities(json.results.map(data=>{
            const {lat,lon,country,city,formatted} = data
            return {lat,lon,country,city,formatted}
            // console.log({
            //     "COUNTRY" :country,
            //     "CITY" :city,
            //     "LATITUDE" :lat,
            //     "LONGITUDE" :lon,
               
            // });
        })))
        .catch(error => console.log('error', error));
      
    }
    const handleAutoCompleteselect = (e,value) =>{
       if(value!==null){
        const {lon,lat} = value
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unity}&exclude={part}&appid=5a2a1f44688fb64b3d47763d337c0989`)
        .then(response => response.json())

        .then(json =>{
            const {clouds,main,name,sys,weather,wind} = json

            dispatch(setData({clouds,main,name,sys,weather,wind}))

        })
        .catch(error => console.log('error', error));
       }else{
      
        dispatch(resetData())
       }
    }
    return ( <>
    
        <Form className={`container m-5 mx-auto ${styles.searchContainer}`} >

            <Form.Group className="d-flex ">
                <Autocomplete 
                clearOnBlur={false} 
                getOptionLabel={(option)=>option.formatted}
                onChange={handleAutoCompleteselect}
                className={styles.searchInput} 

                renderInput={params =>
                    <TextField onChange={handleChange} {...params} 
                    label={'Enter your city ...'} />}
                 options={cities || []}/>

                <Button variant="dark mx-1 focus:ring focus:ring-white font-semibold  ">Search</Button>

            </Form.Group>
            
        </Form>
    </> );
}
 
export default SearchBar;