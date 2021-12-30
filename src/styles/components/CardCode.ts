import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: rgb(004, 024, 050);
  border-radius: 8px;
  width: 100%;
  height: auto;
  max-width: 480px;

  margin: 1rem;
  margin-top: 0;
  margin-left: 0;

  :hover {
    .codeActions {
      opacity: 1;
      transform: translateX(10%) translateY(-35%);
    }
  }
  > section.code {
    max-height: 288px!important;
    width: 100%!important;
    height: 18rem!important;

    &.download {
      max-height: 100%!important;
      height: 100%!important;
      > div#codeContainer {
        pre {
          min-height: 14rem;
        }
      }
    }
  }
  .projectDesc {
    padding: 1.5rem;
  }
  .codeActions {
    opacity: 0;
    transform: translateX(50%);
    position: absolute;
    right: 0;
    padding: 0.5rem;
    display: flex;
    background-color: rgb(0, 0, 0, .4);
    box-shadow: -.5rem .5rem 0 rgba(0, 0, 0, 0.16);
    border-radius: 0 8px 8px 8px;
    transition: .8s ease-in-out;

    button {
      padding: 0 .5rem;
    }
    div {
      background-color: rgb(0, 0, 0, .4);
      width: 2px;
    }
  }
  .cardActions {
    padding: 1.5rem;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    .user {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      p {
        margin-bottom: 5px;
        margin-left: 8px;
      }
    }

    @media (max-width: 340px) {
      flex-direction: column;
      text-align: right;
      .user {
        margin-top: 1rem;
      }
    }
  }
  @media (max-width: 1305px) {
    max-width: 100%;
  }
`;
export const ButtonAction = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  opacity: .6;
  display: inline-flex;
  align-items: center;

  p {
    color: white;
    margin-left: 8px;
  }
  svg {
    color: white;
  }

  :hover {
    opacity: .9;
  }
`;
