/* eslint no-nested-ternary: off */

import React, { useState, useEffect } from 'react';
import { SearchIcon, CloseIcon } from 'Icons';
import { InputProps } from 'types';
import {
  Container,
  Input,
  Textarea,
  Select,
} from './styles';

const InputCp: React.FC<InputProps> = ({
  children,
  placeHolder,
  iD,
  isWidth,
  isType,
  required,
  style,
  ref,
  onChange,
}) => {
  const [searchInput, setSearchInput] = useState(false);
  const btnClass = 'SearchButton-Activate';

  useEffect(() => {
    const searchInputMobile = document.getElementById('searchInputMobile')?.style;

    if (searchInputMobile) {
      if (searchInput) {
        searchInputMobile.display = 'flex';
      } else {
        searchInputMobile.position = 'absolute';
        searchInputMobile.left = '.5rem';

        setTimeout(() => {
          searchInputMobile.position = 'unset';
          searchInputMobile.left = '0';
          searchInputMobile.display = 'none';
        }, 750);
      }
    }
  }, [searchInput]);

  const toggleSearch = () => {
    const inputComp = document.getElementById('inputComp');
    const inputClass = inputComp.classList;

    if (inputClass.contains(btnClass)) {
      inputClass.remove(btnClass);
      setSearchInput(false);
    } else {
      inputClass.add(btnClass);
      setSearchInput(true);
    }
  };

  const searchMobileVerify = () => {
    const searchElem = <Input id={iD} role="search" type="text" placeholder={placeHolder} />;

    return isWidth <= 524 ? (
      <>
        <div className="searchInputMobile" id="searchInputMobile">
          {searchElem}
          <CloseIcon onClick={() => toggleSearch()} />
          <span />
        </div>

        <SearchIcon onClick={() => toggleSearch()} />
      </>
    ) : searchElem;
  };

  return (
    <Container id="inputComp" style={style}>
      {isType === 'search' ? searchMobileVerify()
        : isType === 'select' ? (
          <Select
            id={iD}
            style={{ marginTop: '1rem' }}
            ref={ref}
            onChange={onChange}
          >
            {children}
          </Select>
        )
          : isType === 'description' ? (
            <Textarea
              id={iD}
              required={required}
              style={{ marginTop: '1rem' }}
              placeholder={placeHolder}
            />
          ) : (
            <Input
              id={iD}
              required={required}
              style={{ marginTop: '1rem' }}
              type={isType}
              placeholder={placeHolder}
            />
          )}
    </Container>
  );
};

export default InputCp;
