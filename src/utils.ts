import moment from "moment";

// turn hex into a minified version
export const minifyHex = (hex: string) => {
  return `${hex.substr(0, 4)}..${hex.slice(-4)}`;
};

// convert timestamp into our custom data format
// TODO: maybe remove moment and use a custom function
export const toCustomDateFormat = (timestamp: number) => {
  return moment(timestamp).format("MMM Do [']YY");
};
