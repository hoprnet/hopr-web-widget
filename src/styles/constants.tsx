import css from "styled-jsx/css";

export const constants = css.global`
  * {
    box-sizing: border-box;
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
    color: var(--font-color);
  }

  .icon path {
    fill: var(--alt-font-color);
    color: var(--alt-font-color);
  }
`;
