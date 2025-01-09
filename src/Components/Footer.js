import { useEffect, useState } from "react"
import Copyright from "./Copyright";
import LightDarkTheme from "./LightDarkTheme";

const Footer = () => {
    const [isLight, setIsLight] = useState(() => {
        const curLight = localStorage.getItem("isLight") === 'true';
        // if(!curLight) document.documentElement.classList.toggle("dark");
        // console.log(typeof curLight)
        return curLight;
    })
    console.log(isLight)

    useEffect(() => {
        localStorage.setItem("isLight", isLight)
        document.documentElement.classList.toggle("light", isLight);
        document.documentElement.classList.toggle("dark", !isLight);
    }, [isLight])

    const handleToggleTheme = () => {
        setIsLight(!isLight)
    }

    return (
        <div style={{
            overflow: 'auto',
            backgroundColor: 'transparent',
            padding: '10px 0',
        }}>
            <Copyright />
            <div className="theme-switch">
                <input 
                    type="checkbox" 
                    className="checkbox" 
                    id="checkbox"
                    checked={isLight}
                    onChange={handleToggleTheme}
                />
                <LightDarkTheme />
            </div>
        </div>
    )
}

export default Footer