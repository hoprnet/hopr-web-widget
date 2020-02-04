/*
  colors used throughout the project,
  set as css variables
*/
import css from "styled-jsx/css";

const constants = `
  --error-color: #bb0000;
  --alt-font-color: white;
  --hopr-amount-color: #828282;
`;

export const light = css`
  .global-light-theme {
    ${constants}
    --primary-color: #2f2e2e;
    --secondary-color: #424242;
    --font-color: black;
    --bg-color: #ececec;
    --border-color: #2f2e2e;
    --btn-border: black;
    --chart-content-color: #d6d6d6;
    --input-color: #ffffff;
    --input-border-color: #cccccc;
    --input-focused: #2f2e2e;
    --toggle-flex-direction: row-reverse;
  }
`;

export const dark = css`
  .global-dark-theme {
    ${constants}
    --primary-color: black;
    --secondary-color: #3a3a3a;
    --font-color: white;
    --bg-color: #252525;
    --border-color: black;
    --btn-border: #3a3a3a;
    --chart-content-color: #464646;
    --input-color: #313131;
    --input-border-color: #5a5454;
    --input-focused: white;
    --toggle-flex-direction: row;
  }
`;

// all themes
export const themes = {
  light,
  dark
};
