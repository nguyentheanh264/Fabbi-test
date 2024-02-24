import { Autocomplete, FilterOptionsState, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { AutocompleteOption } from "../../Order/type";

type Props = {
  control: any;
  name: string;
  options: AutocompleteOption[];
  onChangeValue?: (val: any) => void;
  rules?: any;
  filterOptions?: (
    options: AutocompleteOption[],
    state: FilterOptionsState<AutocompleteOption>
  ) => AutocompleteOption[];
};

const CoreAutocomplete = (props: Props) => {
  const { control, options, rules, name, filterOptions, onChangeValue } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <Autocomplete
            value={value}
            // defaultValue={value}
            disablePortal
            options={options}
            onChange={(_, value) => {
              onChange(value);
              if (onChangeValue) onChangeValue(value);
            }}
            onBlur={onBlur}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="------"
                size="small"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />
        );
      }}
      rules={rules}
    />
  );
};

export default CoreAutocomplete;
