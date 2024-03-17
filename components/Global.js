import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
    
    *{
       
    }
    h1, h2, h3, h4, h5, h6, p, a, li, ul, ol, button, input, textarea {
        font-family: Inter, sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: Inter, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
       
    }
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`;
export default GlobalStyles;
