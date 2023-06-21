import React, { FC } from 'react';
import { TabbleButtonType } from './TableButton.type';

const TableButton: FC<TabbleButtonType> = ({ clickHandler, imgSrc, text }) => {
  return (
    <button className="tables__button" onClick={clickHandler}>
      {text}
      <img className="arrow" src={imgSrc} alt="" />
    </button>
  );
};

export default TableButton;
