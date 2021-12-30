import styled from 'styled-components';

const inputDefault = `
  border: none;
  color: #FFF;
  background-color: rgba(255, 255, 255, .16);
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  outline: none;
  transition: background .2s ease-in-out;

  :hover {
    background-color: rgba(255, 255, 255, .24);
  }

  :focus {
    outline: 2px solid rgb(var(--Blue1), .5);
  }
  ::placeholder {
    color: #FFF;
    opacity: .64;
  }
`;

export const Container = styled.div`
  z-index: 8;
  img {
    display: none;
  }
  > svg {
    position: relative;
    top: 0rem;
    transition: opacity .8s ease-in-out;
    animation: iconClose .8s forwards;
  }
  > .searchInputMobile {
    position: relative;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    padding: 1.2rem .5rem;
    width: 100%;
    background: rgba(var(--Background), 0);
    transition: background 3s ease-in-out;

    animation: searchClose .8s forwards;
    > svg {
      position: relative;
    }
  }
  &.SearchButton-Activate {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    overflow-x: scroll;
    width: 100%;

    > svg {
      position: absolute;
      top: calc(1.2rem + 12px);
      opacity: 0!important;
    }
    > .searchInputMobile {
      background: rgba(var(--Background), .97);
      animation: searchOpen .8s forwards;

      > svg {
        animation: iconOpen .8s forwards;
        width: 30px;
      }
      > span {
        margin-left: 1rem;
      }
    }
  }

  @keyframes iconOpen {
    0% {
      right: 3.5rem;
      opacity: 0;
    }
    100% {
      right: -1rem;
      opacity: 1;
    }
  }
  @keyframes searchOpen {
    0% {
      width: 0px;
      opacity: 0;
    }
    100% {
      width: 100%;
      opacity: 1;
      min-width: 250px;
    }
  }
  @keyframes iconClose {
    0% {
      right: -3rem;
      opacity: 0;
    }
    100% {
      right: 0;
      opacity: 1;
    }
  }
  @keyframes searchClose {
    0% {
      width: 100%;
    }
    100% {
      width: 0px;
    }
  }
`;
export const Input = styled.input`
  ${inputDefault}
  max-width: 680px;

  &[type="color"] {
    width: 100%;
    height: 3.5rem;
    padding: .2rem .25rem;
    background: none;
    border: 1px solid white;
    cursor: pointer;

    &::-webkit-color-swatch {
      border: none;
      border-radius: 4px;
    }
  }
`;
export const Select = styled.select`
  ${inputDefault}
  font-family: 'Inter', sans-serif;
  height: 100%;
  cursor: pointer;
  > option {
    background-color: var(--BackgroundInput);
    cursor: pointer;
  }
  &::-ms-expand {
    border: none;
  }
`;
export const Textarea = styled.textarea`
  ${inputDefault}
  resize: none;
  font-family: 'Inter', sans-serif;
  height: 100%;
`;
