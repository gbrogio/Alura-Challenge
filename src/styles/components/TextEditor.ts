import styled from 'styled-components';
import { EditorProps } from 'types';

const macIconsDefault = `
  position: absolute;
  border-radius: 50%;
  width: 12px;
  height: 12px;
`;

export const Container = styled.div`
  padding: 2rem;
  background-color: #141414;
  border-radius: 8px;
  position: relative;
  min-height: 100%;
  height: 100%;

  > span.macIcons {
    top: 3rem;
    left: calc(5rem - 8px);
    background-color: #FFBD2E;
    z-index: 6;
    ${macIconsDefault}

    ::before{
      content: '';
      background-color: #27C93F;
      transform: translateX(1.25rem);
      ${macIconsDefault}
    }
    ::after{
      content: '';
      background-color: #FF5F56;
      transform: translateX(-1.25rem);
      ${macIconsDefault}
    }
    @media (max-width: 425px){
      top: 1.7rem;
      left: calc(4rem - 8px);
    }
  }

  > span.background {
    z-index: 5;
    position: absolute;
    border-radius: 8px 0 8px 0;
    background-color: #141414;
    width: calc(1rem + 4.5rem);
    height: calc(1.5rem + 0.75rem);
    box-shadow: var(--Shadow);
  }

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  > div textarea {
    z-index: 3;
    position: absolute!important;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    padding-top: 3.53rem;
    font-family: monospace;
    resize: none;
    border: none;
    outline: none;

    background: none;
    letter-spacing: -0.18px;
    color: rgb(var(--Blue3));
    -webkit-text-fill-color: transparent;
    opacity: .4;
    overflow-y: scroll;
    ::-webkit-scrollbar{
      width: 16px;
      height: 16px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, .6);
      min-height: 40px;
      transition: .2 ease-in-out;
      :hover {
        background-color: rgba(255, 255, 255, .8);
      }
    }
    ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
      border: 5px solid transparent;
      background-clip: padding-box;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, .3);
    }
  }
  > div pre {
    border-radius: 8px;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0 2rem 0 1rem!important;
    padding-top: 3.5rem!important;
    background-color: #141414!important;
    box-shadow: var(--Shadow);
    resize: none;
    border: none;
    outline: none;
    overflow-x: hidden!important;
    overflow-y: ${(props: EditorProps) => (props.disabled ? 'auto' : 'hidden!important')};
    code {
      white-space: break-spaces!important;
      overflow-wrap: break-word;
    }

    ::-webkit-scrollbar{
      width: 16px;
      height: 16px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, .6);
      min-height: 40px;
      transition: .2 ease-in-out;
      :hover {
        background-color: rgba(255, 255, 255, .8);
      }
    }
    ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
      border: 5px solid transparent;
      background-clip: padding-box;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, .3);
    }
  }

  @media (max-width: 425px){
    padding: 1rem;
  }
`;
