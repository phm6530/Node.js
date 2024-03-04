import React, { forwardRef } from 'react';
import SKILL_ICON from '../../../../../component/icon/StackIcon';

import styled from 'styled-components';

const SkillWrap = styled.div`
  display: flex;
  span{
    color: #222;
    font-weight: bold;
  }
`

const LabelStyle = styled.label`
    display: flex;
    cursor: pointer;
    /* padding-left: 1rem; */
    margin-right: 0rem;
    /* background: rgba(0, 0, 0, 0.04); */
    /* border-radius: 1em; */
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    /* border: 1px solid rgba(0, 0, 0, 0.2); */
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: 10px;
    background: #f8f8f8;
`

const Checkbox = forwardRef((props , ref) => {
    const { label, ...rest } = props;
    const SkillComponent = SKILL_ICON[label];
    // console.log(label);
  return (
    <LabelStyle>
      <input
        type="checkbox"
        ref={ref}
        value={label}
        {...rest}
      />
      {SkillComponent && (
        <SkillWrap key={`skill-${label}`}>
          <SkillComponent label={label}/>
        </SkillWrap>
      )}
    </LabelStyle>
  );
});

export default Checkbox;