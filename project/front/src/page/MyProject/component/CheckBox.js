import React, { forwardRef } from 'react';

const Checkbox = forwardRef((props , ref) => {
    const { label, ...rest } = props;
  return (
    <label>
      <input
        type="checkbox"
        ref={ref}
        {...rest}
        value={label}
      /> {label}
    </label>
  );
});

export default Checkbox;