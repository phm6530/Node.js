import React, { forwardRef } from 'react';

const Checkbox = forwardRef((props , ref) => {
    const { label, ...rest } = props;
  return (
    <label>
      <input
        type="checkbox"
        ref={ref}
        value={label}
        
        {...rest}
      /> {label}
    </label>
  );
});

export default Checkbox;