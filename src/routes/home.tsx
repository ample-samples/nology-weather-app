import { useEffect, useState } from 'react'
import { WeatherData } from '../types/weatherData'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
console.log(apiKey)

const Home = () => {
  type Location = {
    latitude?: number
    longitude?: number
  }

  const [location, setLocation] = useState<Location>({})
  const [weatherData, setSetWeatherData] = useState<WeatherData>()
  const now = new Date()

  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    if (!location.latitude || !location.longitude) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }
  }
  )

  const getWeatherData = async (): Promise<WeatherData | undefined> => {
    if (!location.latitude || !location.longitude) {
      return
    }
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}&aqi=no`)
    const data = await res.json()
    console.log(data)
    setSetWeatherData(data)
    return data
  }

  useEffect(() => {
    console.log(location)
    getWeatherData()
  }, [location])

  return (
    <>
      <section className='m-auto flex-row justify-center'>
        {now.getHours() < 12 ? <h1 className='text-4xl text-center'>Good morning</h1> : <h1>Good afternoon</h1>}


        <p className='text-2xl text-center'>In {weatherData?.location.name}, the weather right now is {weatherData?.current.condition.text.toLowerCase()}</p>
        {weatherData?.current.condition.icon &&
          <img className='mx-auto' src={weatherData.current.condition.icon} alt="" />
        }
      </section>
    </>
  )
}

export default Home
