import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    overflow-x: hidden;
    background-color: rgb(var(--Background));
    color: #fff;

    height: 100%;
    font-weight: 400;
  }

  .invisible {
    position: fixed;
    left: -99999999999rem;
    overflow: hidden;
  }
  span.line {
    opacity: 0.08;
    border: 1px solid #FFF;
    width: 100%;
    margin: 1.5rem 0;
  }
  strong{
    font-weight: 900;
  }
`;

export const Colors = createGlobalStyle`
  :root {
    --Blue3: 150, 185, 253; // rgb(150, 185, 253)
    --Blue2: 123, 164, 252; // rgb(123, 164, 252)
    --Blue1: 080, 129, 251; // rgb(080, 129, 251)
    --Red: 246, 081, 081;   // rgb(246, 081, 081)

    --Background: 005, 029, 059; // rgb(005, 029, 059)
    --Shadow: 0 1rem 1.5rem rgb(0, 0, 0, .24);
    --BackgroundInput: #2D415B;
  }
`;
