import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CoreAutocomplete from "../../components/CoreAutocomplete";
import { dishesData } from "../../configs/data";
import { RequestBodyOrder } from "../type";

const StepThree = () => {
  const { control, formState, register, watch } =
    useFormContext<RequestBodyOrder>();

  console.log("_______ formState.error _______", formState.errors.root);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dishesConfig",
    keyName: "key",
  });

  const [mealCategory, restaurant, dishesConfig] = watch([
    "mealCategory.value",
    "restaurant.value",
    "dishesConfig",
  ]);

  const dishList = useMemo(() => {
    return dishesData
      .filter(
        (x) =>
          x?.restaurant === restaurant &&
          x?.availableMeals.includes((mealCategory as string).toLowerCase())
      )
      .map((item) => ({ value: item?.id, label: item?.name }));
  }, [mealCategory, restaurant]);

  return (
    <Box className="my-5">
      <Box className="flex mb-4 space-x-10">
        <Typography width={"50%"} fontWeight={600}>
          Please Select a Dish
        </Typography>
        <Typography width={"50%"} fontWeight={600}>
          Please Enter no of servings
        </Typography>
        <Box />
      </Box>
      {fields?.map((item, index) => {
        return (
          <Box className="flex mb-4 space-x-10" key={item?.key}>
            <Box sx={{ width: "50%" }}>
              <CoreAutocomplete
                control={control}
                name={`dishesConfig.${index}.dish`}
                options={dishList}
                rules={{ required: "This field is required" }}
                filterOptions={(options) => {
                  const dishSelected = dishesConfig?.map((i) => i?.dish?.value);
                  return options?.filter(
                    (x) => !dishSelected.includes(x?.value)
                  );
                }}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <TextField
                size="small"
                fullWidth
                // label="Number of People"
                type="number"
                error={!!formState.errors.dishesConfig?.[index]?.no}
                helperText={formState.errors.dishesConfig?.[index]?.no?.message}
                {...register(`dishesConfig.${index}.no`, {
                  min: {
                    value: 1,
                    message: "Cannot be less than 1",
                  },
                  required: "This field is required",
                })}
              />
            </Box>
            <Box sx={{ width: "5%" }}>
              {fields.length > 0 && (
                <IconButton onClick={() => remove(index)}>
                  <RemoveCircleOutlineIcon color="error" />
                </IconButton>
              )}
            </Box>
          </Box>
        );
      })}
      {fields.length < dishList.length && (
        <IconButton onClick={() => append({ dish: null, no: 1 })}>
          <AddCircleOutlineIcon color="success" />
        </IconButton>
      )}

      {formState?.errors?.root?.message && (
        <Typography variant="caption" component="div" color={"#d32f2f"}>
          {formState?.errors?.root?.message}
        </Typography>
      )}
    </Box>
  );
};

export default StepThree;
