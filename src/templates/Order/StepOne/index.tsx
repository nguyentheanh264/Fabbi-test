import { Box, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CoreAutocomplete from "../../components/CoreAutocomplete";
import { mealOptions } from "../../configs/constants";
import { RequestBodyOrder } from "../type";

const StepOne = () => {
  const { control, formState, register } = useFormContext<RequestBodyOrder>();
  return (
    <Box className="my-5">
      <Box>
        <Typography mb={2} fontWeight={600}>
          Please Select a meal
        </Typography>
        <CoreAutocomplete
          control={control}
          name="mealCategory"
          options={mealOptions}
          rules={{ required: "This field is required" }}
        />
      </Box>
      <Typography my={2} fontWeight={600}>
        Please Enter Number of People
      </Typography>
      <TextField
        size="small"
        fullWidth
        // label="Number of People"
        type="number"
        error={!!formState.errors.noOfPeople}
        helperText={formState.errors.noOfPeople?.message}
        {...register("noOfPeople", {
          min: {
            value: 1,
            message: "Cannot be less than 1",
          },
          max: {
            value: 10,
            message: "Cannot be greater than 10",
          },
          required: "This field is required",
        })}
      />
    </Box>
  );
};

export default StepOne;
