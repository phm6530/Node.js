import {useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

const CustumDatePicker = ({control , errors , label , startDateName , endDateName }) => {
    const [ startDate , setStartDate ] = useState(false);

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
                        selected={value}
                        placeholderText='시작일을 입력해주세요.'
                        dateFormat='yyyy-MM-dd'
                    />
                }
            />
            {errors[startDateName] && errors[startDateName].message}

            {startDate &&  (
                <>
                <Controller
                    name={endDateName}
                    control={control}
                    render={({field : { onChange , value }})=>
                        <DatePicker
                            onChange={(today)=>onChange(today)}
                            selected={value}
                            placeholderText='종료일을 입력해주세요.'
                            dateFormat='yyyy-MM-dd'
                            minDate={startDate}
                        />
                    }
                />
                {errors[endDateName] && errors[endDateName].message}
                </>
            )
        }
      </div>
    );
};

export default CustumDatePicker;


