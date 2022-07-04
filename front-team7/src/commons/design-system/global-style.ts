import * as styled from 'styled-components';

export const GlobalStyle = styled.createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;700&display=swap');

  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
    line-height: 1.3;
    -webkit-text-size-adjust: 100%;
  }

  body {
    overflow-x: hidden;
    max-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    background: #eae7dd;
    box-sizing: border-box;
    font-family: 'Roboto', 'Noto Sans KR', arial, sans-serif;
    color: #3d3d3d;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }

  button {
    font-family: 'Roboto', 'Noto Sans KR', arial, sans-serif;
    border: 0;
  }

  p {
    margin: 0;
  }
`;
