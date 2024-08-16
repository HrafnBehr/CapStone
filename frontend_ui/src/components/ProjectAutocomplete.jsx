import { useEffect, useState } from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";

export function ProjectAutocomplete(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setSelectedProjects } = props;

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(`http://localhost:8080/api/v1/projects`);
      const data = await response.json();
      setProjects(data.projects);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <Autocomplete
      multiple
      id="project"
      options={projects}
      disableCloseOnSelect
      disabled={loading}
      getOptionLabel={(option) => option.name}
      onChange={(_event, newValue) => {
        setSelectedProjects(newValue);
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
          label={loading ? "Loading projects..." : "Project"}
          placeholder="Select projects"
        />
      )}
    />
  );
}