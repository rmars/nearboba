import { useEffect, useState, useMemo } from "react";
import Container from "@mui/material/Container";
import BusinessTable from "./BusinessTable.js";
import Form from "./Form.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { flatMap } from "lodash";
import { locations, extractCity, officeAddressLookup } from "./util.js";

function Boba() {
  const [businesses, setBusinesses] = useState({
    los_gatos: [],
    new_york: [],
    los_angeles: [],
  });
  const [location, setLocation] = useState("all");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  // handle setPage in the parent component, since we need to do
  // things like resetting the pagination when the user selects
  // a new office
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const requests = locations.map(l =>
      fetch(
        `api/boba?location=${encodeURIComponent(
          officeAddressLookup[l]
        )}&limit=${encodeURIComponent(limit)}`
      )
    );

    Promise.all(requests)
      .then(responses => {
        const errors = responses.filter(response => !response.ok);

        if (errors.length > 0) {
          throw errors.map(response => Error(response.statusText));
        }

        const json = responses.map(response => response.json());
        return Promise.all(json);
      })
      .then(data => {
        const businesses = data.reduce((mem, city) => {
          if (city.businesses.length > 0) {
            mem[extractCity(city.businesses)] = city.businesses;
          }
          return mem;
        }, {});
        setBusinesses(businesses);
        setLoading(false);
      })
      .catch(errors => {
        if (errors.length > 0) {
          errors.forEach(error => console.error(error));
        }
        setLoading(false);
      });
  }, [limit]);

  const setOffice = office => {
    setLocation(office);
    setPage(0); // return to the first page of the table
  };

  const updateLimit = newLimit => {
    setLimit(newLimit);
    setPage(0); // return to the first page of the table
  };

  const showingBusinesses = useMemo(() => {
    switch (location) {
      case "all":
        return flatMap(businesses, v => v);
      case "new_york":
        return businesses.new_york || [];
      case "los_gatos":
        return businesses.los_gatos || [];
      case "los_angeles":
        return businesses.los_angeles || [];
      default:
        return [];
    }
  }, [businesses, location]);

  return (
    <Container sx={{ padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Paper sx={{ p: 2, backgroundColor: "" }}>
            <Typography py={1} variant="h3">
              NearBoba
            </Typography>
            <Form
              onOfficeChange={setOffice}
              limit={limit}
              onLimitChange={updateLimit}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <BusinessTable
              rows={showingBusinesses}
              page={page}
              setPage={setPage}
              loading={loading}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Boba;
