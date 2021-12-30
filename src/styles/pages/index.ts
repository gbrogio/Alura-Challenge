import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 8rem;
  display: flex;
  padding: 0 1.5rem 0 18rem;

  @media (max-width: 768px){
    padding: 0 1.5rem;
  }
  @media (max-width: 425px){
    padding: .5rem;
  }
`;
export const Header = styled.header`
  z-index: 9;
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: scroll;
  top: 0;
  width: 100vw;
  background-color: rgb(var(--Background), .98);

  padding: 1.5rem;

  menu.topGroup {
    display: inherit;
    align-items: center;
    justify-content: space-between;

    > section.searchBar {
      margin-left: 5.2rem;
      width: 100%;

      @media (max-width: 1024px) {
        margin-left: 0;
      }
      @media (max-width: 595px) {
        text-align: right;
      }
    }
    > .sign {
      section.signed {
        margin-left: 0;
        transform: scale(.9);
      }
      section.notSing {
        button {
          white-space: nowrap!important;
          padding: .5rem 1rem!important;
          margin-left: 2rem!important;
        }
      }
    }
    > section.navigationRight {
      background-color: #2D415B;
      border-radius: 8px;
      position: fixed;
      flex-direction: column;
      display: inherit;
      overflow-x: hidden;
      overflow-y: scroll;
      box-shadow: var(--Shadow);
      padding: 1.5rem;
      transition: opacity .5s 0s, transform 1s 0s, visibility .5s 0s;
      top: 6rem;
      right: 1rem;
      height: calc(100vh - 7rem);
      opacity: 0;
      visibility: hidden;
      transform: translateX(20%)!important;

      width: 15.875rem;

      > .sign {
        align-items: center;
        section.notSing {
          button {
            padding: .5rem!important;
            margin: 0rem!important;
          }
        }
      }

      @media (max-width: 286px) {
        padding: 1rem;
        right: .1rem;
        width: calc(100vw - .2rem);
      }
      @media (max-width: 226px) {
        padding: .5rem;
      }
    }
  }
  #menuCheck:checked {
    & ~ label[for="menuCheck"] {
      z-index: 9;
      display: flex;
      border-radius: 50%;
      transition: .8s ease-in-out;

      > span {
        animation: openMid .8s forwards;

        ::before {
          animation: openTop .8s forwards;
        }
        ::after {
          transform: translateX(-20px) rotate(-45deg);
          opacity: 0;
        }
      }
    }
    & ~ section.navigationRight {
      opacity: 1!important;
      visibility: visible!important;
      transform: translateX(0)!important;
    }
  }
`;
export const LeftGroup = styled.menu`
  z-index: 9;
  position: fixed;
  width: 18rem;
  height: 100%;
  top: 5.9rem;
  left: 0;
  padding: 3rem 0 0 1.5rem;
  background-color: rgb(var(--Background), .98);

  margin-right: 40px;
`;

export const Container = styled.section`
  width: 100%;
  > form {
    width: 100%;
    display: flex;
  }
  section.editor {
    max-width: calc(100% - 23.5rem);
    height: 22.875rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  section.description {
    min-width: 20.938rem;
    margin-left: 2.5rem;

    > div {
      input {
        max-width: 100%;
      }
    }
    section.languageColor {
      @media (max-width: 1024px) {
        @media (min-width: 425px) {
          width: 100%;
          display: flex;

          div {
            width: 100%;
            height: 3.5rem;
            margin: 1rem .5rem;
          }
        }
      }
    }
    @media (max-width: 375px) {
      min-width: 0;
    }
  }
  section.projectsContent {
    width: 100%;
    transform: translateX(.5rem);

    display: flex;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    > form {flex-direction: column;}
    section.editor {
      max-width: unset;
      width: inherit;
      display: inherit;
      flex-direction: column;
    }
    section.description {
      margin: 2rem 0;
      margin-top: 8rem;
    }
  }
`;
