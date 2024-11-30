
import React, { useEffect, useRef, useState } from 'react'
import search from "../assets/Assets/search.png"
import clear from "../assets/Assets/clear.png"
import cloud from "../assets/Assets/cloud.png"
import drizzle from "../assets/Assets/drizzle.png"
import humidity from "../assets/Assets/humidity.png"
import rain from "../assets/Assets/rain.png"
import snow from "../assets/Assets/snow.png"
import wind from "../assets/Assets/wind.png"
import styled from 'styled-components';

const Weather = () => {
    const inputRef = useRef()
    const [weatherData,setweatherData]= useState(false);

    // there is an icon link on the api call, i only used the imported images inplace of the api icons
    const allIcons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
    }
    // used an asyn function
    const searchCountry = async (city)=>{
        // if country is empty
        if(city === ""){
            alert("Enter City name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=761ad8c7fb25837aca0e4834f8051dac`

            const response = await fetch(url)
            const data = await response.json();
            if(!response.ok){
                alert(data.message)
                return;
            }

            console.log(data);
            // ternary operator to select icons
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            // using the API keys to select necessary info
            setweatherData({
                humidity: data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
            
        }catch(err){
            setweatherData(false);
            console.error("error in fetching weather data")
        }
    }
    // to avoid multiple request
    useEffect(()=>{
        searchCountry("new york");
    },[])

  return (
    <Section className='weather'>
        <div className="searchBar">
            <input ref={inputRef} type="text" name="" id="" placeholder='search'/>
            <img src={search} alt="" onClick={()=>searchCountry(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} alt="" className='weatherIcon' />
        <p className='temp'>{weatherData.temperature}</p>
        <p className='location'>{weatherData.location}</p>

        <div className="weatherData">
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
        
            <div className="col">
                <img src={wind} alt="" />
                <div>
                    <p>{weatherData.windSpeed}</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </Section>
  )
};
export default Weather;

const Section = styled.div`
    margin: auto;
    padding: 40px;
    border-radius:10px;
    background-image: linear-gradient(45deg, #2f4680,#500ae4);
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width:400px){
        padding: 30px;
    }
    

    

    .searchBar{
        display: flex;
        align-items: center;
        gap: 12px;

        input{
            height: 50px;
            border: none;
            border-radius: 20px;
            outline: none;
            padding-left: 25px;
            color:#626262;
            background: #ebfffc;
            font-size: 18px;

            @media (max-width:450px){
                padding-left: 10px;
        }
        @media (max-width:400px){
                height: 40px;
             }
       
        }

        img{
            width: 50px;
            padding: 15px;
            border-radius: 50%;
            background: #ebfffc;
            cursor: pointer;

            @media (max-width:400px){
                width: 40px;
                border-radius: 50%; 
             }
        }
       
    }
    .weatherIcon{
            width:150px;
            margin: 10px 0px;

            @media (max-width:400px){
                width: 90px;
    }
        }
        .temp{
            color: #fff;
            font-size: 80px;
            line-height: 1;

            @media (max-width:400px){
        font-size: 40px;
    }
        }
        .location{
            color: #fff;
            font-size: 40px;
            @media (max-width:400px){
        font-size :30px ;
    }
        }
        .weatherData{
            width: 100%;
            margin-top: 20px;
            color: #fff;
            display: flex;
            justify-content: space-between;

            @media (max-width:400px){
        /* flex-direction: column; */
        justify-content: space-around;
    }

            .col{
                display: flex;
                align-items: flex-start;
                gap: 12px;
                font-size: 22px;

                @media (max-width:400px){
                font-size: 16px;
             }

                span{
                    display: block;
                    font-size: 16px;

                    @media (max-width:400px){
                font-size: 12px;
             }
                }

                img{
                    width: 16px;
                    margin-top: 10px;
                }
            }
            
    }
`


 