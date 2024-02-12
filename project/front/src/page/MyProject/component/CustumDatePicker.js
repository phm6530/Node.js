import {useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

const CustumDatePicker = ({control , errors , label , startDateName , endDateName }) => {
    const [ startDate , setStartDate ] = useState(false);
    const [ endDate , setEndDate ] = useState(false);
    console.log(startDate);
    return (
      <div className='custumDatePicker'>
            {label}

            <Controller
                name={startDateName}
                control={control}
                render={({field : { onChange , value }})=>
                    <DatePicker
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

         
                <>
                <Controller
                    name={endDateName}
                    control={control}
                    render={({field : { onChange , value }})=>
                        <DatePicker
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
    );
};

export default CustumDatePicker;


