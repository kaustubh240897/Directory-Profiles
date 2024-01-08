import { useEffect, useState } from "react";
import classes from "./UserClock.module.css"; 

function UserClock() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState("");

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://worldtimeapi.org/api/timezone");
                const data = await response.json();
                setCountries(data);
                setSelectedCountry(data[0]);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await fetch(`https://worldtimeapi.org/api/timezone/${selectedCountry}`);
                const data = await response.json();
                const dateTime = new Date(data.datetime);
                const options = {
                    timeZone: selectedCountry,
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                };
                setTime(dateTime.toLocaleTimeString("en-US", options));
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };

        fetchTime();
    }, [selectedCountry]);

    useEffect(() => {
        let intervalId;

        if (!isPaused) {
            intervalId = setInterval(() => {
                setTime((prevTime) => {
                    const [hours, minutes, seconds] = prevTime.split(":").map(Number);
                    const newSeconds = (seconds + 1) % 60;
                    const newMinutes = (minutes + Math.floor((seconds + 1) / 60)) % 60;
                    const newHours = (hours + Math.floor((minutes + 1) / 60)) % 24;
                    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isPaused]);

    return (
        <div className={classes.clock}>
            <select onChange={handleCountryChange} value={selectedCountry} className={classes.dropdown}>
                {countries.map((country) => (
                    <option key={country}>{country}</option>
                ))}
            </select>
            <div className={classes.time}>{time}</div>
            <button className={classes.control} onClick={togglePause}>
                {isPaused ? "Start" : "Pause"}
            </button>
        </div>
    );
}

export default UserClock;
