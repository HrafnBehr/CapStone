import { useEffect, useState } from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";

export function MilestoneAutocomplete(props) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setSelectedMilestones } = props;

  useEffect(() => {
    async function fetchMilestones() {
      const response = await fetch(`http://localhost:8080/api/v1/milestones`);
      const data = await response.json();
      setMilestones(data.milestones);
      setLoading(false);
    }
    fetchMilestones();
  }, []);

  return (
    <Autocomplete
      multiple
      id="milestone"
      options={milestones}
      disableCloseOnSelect
      disabled={loading}
      getOptionLabel={(option) => option.name}
      onChange={(_event, value) => {
        setSelectedMilestones(value);
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={loading ? "Loading milestones..." : "Milestone"}
          placeholder="Select milestones"
        />
      )}
    />
  );
}