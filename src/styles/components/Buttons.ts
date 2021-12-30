import styled from 'styled-components';

const defaultStyle = `
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 2rem;
  padding: 1rem;
  border-radius: 8px;
`;

export const ButtonOutlined = styled.button`
  ${defaultStyle};
  background-color: rgb(var(--Blue1), .08);
  color: #fff;
  :hover {
    background-color: rgb(var(--Blue2), .16);
  }
  :active {
    background-color: rgb(var(--Blue2), .16);
    outline: 4px solid rgb(var(--Blue1), .24);
  }
  :focus {
    background-color: rgb(var(--Blue2), .24);
  }
`;

export const ButtonFilled = styled.button`
  ${defaultStyle};
  background-color: rgb(var(--Blue1));
  color: rgb(var(--Background));
  :hover {
    background-color: rgb(var(--Blue2));
  }
  :active {
    background-color: rgb(var(--Blue2));
    outline: 4px solid rgb(var(--Blue1));
  }
  :focus {
    background-color: rgb(var(--Blue3));
    outline: 4px solid rgb(var(--Blue1));
  }

  &.delete {

    background-color: rgb(var(--Red), .6);
    color: white;
    :hover {
      background-color: rgb(var(--Red), .8);
    }
    :active, :focus {
      background-color: rgb(var(--Red), 1);
      outline: 4px solid rgb(var(--Red), .4);
    }
  }
`;
