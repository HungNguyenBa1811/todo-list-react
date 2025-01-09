import { useState, useEffect } from 'react';

const Clock = () => {
    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        return {
            weekday: today.toLocaleDateString('en-US', { weekday: 'long' }),
            fullDate: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const today = new Date();
            setCurrentDate({
                weekday: today.toLocaleDateString('en-US', { weekday: 'long' }),
                fullDate: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            });
        }, 100000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='clock-wrapper'>
            <h1>{currentDate.weekday}</h1>
            <p>{currentDate.fullDate}</p>
        </div>
    );
};

export default Clock;