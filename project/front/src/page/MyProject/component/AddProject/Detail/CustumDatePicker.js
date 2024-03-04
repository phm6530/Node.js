import {useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';


// 데이터피커 스타일
const DatePickerStyle = styled(DatePicker)`
    padding: 5px 10px;
    border-radius: .5em;
    background: #fdfdfd;
    border: 1px solid #00000014;
    color: #222;
    ${props => props.$error && `border: 1px solid #ffcece;`}
    &::placeholder{
        color:rgba(0,0,0,1);
    }
`

const RageStyle =styled.div`
    display: flex;
    align-items: center;
    margin: 0px 1rem ;
`

const CustumDatePickerStyle = styled.div`
    display: flex;
`

const CustumDatePicker = ({control , errors , startDateName , endDateName }) => {
    const [ startDate , setStartDate ] = useState(false);
    const [ endDate , setEndDate ] = useState(false);
    // console.log(startDate);
    return (
      <CustumDatePickerStyle>
            <div>
            <Controller
                name={startDateName}
                control={control}
                render={({field : { onChange , value }})=>
                    <DatePickerStyle
                        onChange={(startDate)=>{
                            setStartDate(startDate);
                            onChange(startDate)
                        }}
                        showMonthDropdown={true}
                        selected={value}
                        placeholderText='시작일을 입력해주세요.'
                        dateFormat='yyyy-MM-dd'
                        maxDate={endDate}
                    />
                }
            />
            {errors[startDateName] && <p className='errorMessage'>{errors[startDateName].message}</p>}
            </div>
            <RageStyle>-</RageStyle>
            <div>
                <>
                <Controller
                    name={endDateName}
                    control={control}
                    render={({field : { onChange , value }})=>
                        <DatePickerStyle
                            onChange={(endDay)=>{
                                setEndDate(endDay);
                                onChange(endDay);
                            }}
                            selected={value}
                            placeholderText='종료일을 입력해주세요.'
                            dateFormat='yyyy-MM-dd'
                            minDate={startDate}
                        />
                    }
                />
                {errors[endDateName] && <p className='errorMessage'>{errors[endDateName].message}</p>}
                </>
         
            </div>
      </CustumDatePickerStyle>
    );
};

export default CustumDatePicker;


