import { find } from "lodash";

const metresPerMile = 1609.34;

export const toMiles = metres => {
  let miles = metres / metresPerMile;
  return Math.round(miles * 10) / 10;
};

export const zipCodeStartToOffice = {
  90: "los_angeles",
  10: "new_york",
  95: "los_gatos",
};

export const locations = ["new_york", "los_gatos", "los_angeles"];

export const officeAddressLookup = {
  los_angeles: "5808 Sunset Blvd, Los Angeles, CA 90028",
  new_york: "888 Broadway, New York, NY 10003",
  los_gatos: "121 Albright Way, Los Gatos, CA 95032",
};

export const extractCity = businesses => {
  let c = find(businesses, b => b.location && b.location.zip_code !== null);
  let { zip_code } = c.location;

  return zipCodeStartToOffice[zip_code.slice(0, 2)];
};
