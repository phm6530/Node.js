
export const TodaySeletor = () =>{
    const TodayCalculater = () =>{
        const date = new Date();    
        const Day = date.getDate();
        const Year = date.getFullYear();
        const Month = date.getMonth();
        return `${Year}-${Month + 1 }-${Day}`
    } 
    return TodayCalculater;
}

