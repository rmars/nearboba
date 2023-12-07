import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";

export default function Form({ onOfficeChange, onLimitChange, limit }) {
  const [office, setOffice] = useState("all");
  const [limitText, setLimitText] = useState(limit);

  const handleDropdownChange = event => {
    setOffice(event.target.value);
    onOfficeChange(event.target.value);
  };

  const handleTextChange = event => {
    setLimitText(event.target.value);
  };

  const handleButtonClick = () => {
    onLimitChange(limitText);
  };

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item container alignItems="center">
        <Grid item>
          <Typography>Showing boba near</Typography>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={office}
              onChange={handleDropdownChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="all">
                <em>All offices</em>
              </MenuItem>
              <MenuItem value="los_angeles">Los Angeles</MenuItem>
              <MenuItem value="los_gatos">Los Gatos</MenuItem>
              <MenuItem value="new_york">New York</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={1}
        justifyContent="flex-start"
        alignItems="center">
        <Grid item>
          <Typography>Show</Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              id="outlined-number"
              type="number"
              size="small"
              value={limitText}
              onChange={handleTextChange}
              sx={{
                maxWidth: 75,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Typography>results per office</Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <Button variant="outlined" onClick={handleButtonClick}>
              Update
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
