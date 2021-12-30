import styled from 'styled-components';

export const Container = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 1rem;
  margin-left: 0;
  opacity: .56;
  transition: .2s ease-in-out;

  div {
    display: inherit;
    align-items: inherit;
    justify-content: center;
    background-color: rgb(var(--Blue1), .36);

    border-radius: 1rem;
    width: 3rem;
    height: 3rem;
  }
  p {
    color: #FFF;
    margin-left: 1rem;
  }

  &:focus, &.activeLink {
    opacity: .80;
    > div {
      background-color: rgb(var(--Blue1));
    }
  }
  :hover {
    opacity: 1;
    div {
      background-color: rgb(var(--Blue1), .84);
    }
  }
`;
