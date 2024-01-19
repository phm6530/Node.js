
const filterWord = ['돼지' , '뚱땡이'];

// 필터링 *** 로 변경하기
const filterWording = (word) =>{
    const filteredWording = filterWord.reduce((filtering , badword)=>{
        const regExp = new RegExp(badword , 'g');
        return filtering.replace(regExp, "*".repeat(badword.length)) 
    },word);
    return filteredWording;
}

// 욕설 있는지 찾기
const validateWord = (word) =>{
    const filter = filterWord.filter(badword => {
        console.log(badword);
            return word.includes(badword);
    });
    console.log(filter);
    return { isValidate : filter.length > 0 ? true : false , badword : filter.length }
    
}

export { filterWording , validateWord }