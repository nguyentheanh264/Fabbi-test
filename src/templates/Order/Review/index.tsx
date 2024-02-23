import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RequestBodyOrder } from "../type";

const Review = () => {
  const { watch } = useFormContext<RequestBodyOrder>();

  const [mealCategory, noOfPeople, restaurant, dishesConfig] = watch([
    "mealCategory.label",
    "noOfPeople",
    "restaurant.label",
    "dishesConfig",
  ]);

  const finalData = [
    {
      title: "Meal",
      value: <Typography>{mealCategory}</Typography>,
    },
    {
      title: "No of People",
      value: <Typography>{noOfPeople}</Typography>,
    },
    {
      title: "Restaurant",
      value: <Typography>{restaurant}</Typography>,
    },
    {
      title: "Dishes",
      value: (
        <Box sx={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
          {dishesConfig?.map((item, index) => (
            <Box key={index} className="flex">
              <Typography width={"80%"}>{item?.dish?.label}</Typography>
              <Typography mr={1}>-</Typography>
              <Typography width={"20%"}>{item?.no}</Typography>
            </Box>
          ))}
        </Box>
      ),
    },
  ];

  return (
    <Box className="my-5">
      {finalData?.map((x, index) => {
        return (
          <Box key={index} className="flex mb-5">
            <Typography width={"50%"}>{x?.title}</Typography>
            <Box width={"50%"}>{x?.value}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Review;
