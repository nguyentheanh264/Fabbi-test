import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import CoreAutocomplete from "../../components/CoreAutocomplete";
import { dishesData } from "../../configs/data";
import { RequestBodyOrder } from "../type";

const StepTwo = () => {
  const { control, watch, setValue } = useFormContext<RequestBodyOrder>();
  const mealCategory = watch("mealCategory.value");
  const restaurantList = useMemo(() => {
    const uniqueNameRestaurant: string[] = [];
    return dishesData
      ?.filter((x) => {
        const isDuplicate = uniqueNameRestaurant.includes(x.restaurant);
        if (
          !isDuplicate &&
          x?.availableMeals.includes((mealCategory as string).toLowerCase())
        ) {
          uniqueNameRestaurant.push(x.restaurant);

          return true;
        }
        return false;
      })
      .map((item) => ({ value: item?.restaurant, label: item?.restaurant }));
    // eslint-disable-next-line
  }, []);

  return (
    <Box className="my-5">
      <Box>
        <Typography mb={2} fontWeight={600}>
          Please Select Restaurant
        </Typography>
        <CoreAutocomplete
          control={control}
          name="restaurant"
          options={restaurantList}
          onChangeValue={() => {
            setValue("dishesConfig", [{ dish: null, no: 1 }]);
          }}
          rules={{ required: "This field is required" }}
        />
      </Box>
    </Box>
  );
};

export default StepTwo;
