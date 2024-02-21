
export const TodaySeletor = () =>{
    const TodayCalculater = () =>{
        const date = new Date();    
        const Year = date.getFullYear();
        const Month = date.getMonth();
        const Day = date.getDate();
        return `${Year}-${Month + 1 }-${Day}`
    } 
    return TodayCalculater;
}

