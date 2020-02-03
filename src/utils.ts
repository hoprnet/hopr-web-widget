import moment from "moment";

// convert ethereum address into a minified version
export const minifyAddress = (address: string) => {
  return `${address.substr(0, 4)}..${address.slice(-4)}`;
};

// convert timestamp into our custom data format
// TODO: maybe: remove moment and use a custom function
export const toCustomDateFormat = (timestamp: number) => {
  return moment(timestamp).format("MMM Do [']YY");
};
