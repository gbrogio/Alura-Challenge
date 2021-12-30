import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  .signed {
    user-select: none;
    cursor: pointer;
    width: auto;
    max-height: 2.9rem;
    margin-left: 2rem!important;
    display: flex;
    align-items: center;
    padding: .5rem;
    transition: .2s ease-in-out;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    p {
      max-width: 106px;
      margin-left: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :hover {
      background-color: rgba(255, 255, 255, .08);
      border-radius: 8px;
    }

    @media (max-width: 768px) {
      margin-left: 10px!important;
      transform: scale(.8);
    }
  }
  .userMethsModal {
    display: flex;
    position: fixed;
    background-color: rgba(45, 65, 91, .8);
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 9px;
    justify-content: center;
    flex-direction: column;
    right: 1rem;
    box-shadow: var(--Shadow);
    transition: .2s ease-in-out;

    :hover {
      background-color: rgba(45, 65, 91, .9);
    }


    @keyframes animOpen {
      0%{
        opacity: 0;
        transform: translate(40%);
      }
      100%{
        opacity: 1;
        transform: translate(0);
      }
    }
    @keyframes animClose {
      0%{
        opacity: 1;
        transform: translate(0);
        visibility: visible;
      }
      100%{
        opacity: 0;
        transform: translate(40%);
        visibility: hidden;
      }
    }

    @media (max-width: 768px) {
      position: unset;
      right: 0;
    }
  }
`;
