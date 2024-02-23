import { Box, Button, Card, CardContent } from "@mui/material";
import { FormProvider } from "react-hook-form";
import CustomSteps from "../components/CustomSteps";
import { dataSteps } from "../configs/constants";
import Review from "./Review";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { useOrder } from "./useOrder";

const Order = () => {
  const [values, handles] = useOrder();
  const { activeStep, methodForm } = values;
  const { setActiveStep, onSubmit } = handles;

  return (
    <form onSubmit={onSubmit}>
      <FormProvider {...methodForm}>
        <Card
          className="flex flex-col justify-center p-10"
          sx={{ width: "960px" }}
        >
          <CardContent
            sx={{ minHeight: "400px", minWidth: "400px", maxWidth: "600px" }}
          >
            <CustomSteps dataSteps={dataSteps} activeStep={activeStep} />
            <Box>
              {activeStep === 1 && <StepOne />}
              {activeStep === 2 && <StepTwo />}
              {activeStep === 3 && <StepThree />}
              {activeStep === 4 && <Review />}
            </Box>
          </CardContent>
          <Box className="flex justify-between">
            <Box>
              {activeStep !== 1 && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setActiveStep((step) => step - 1)}
                >
                  Previous
                </Button>
              )}
            </Box>
            <Button
              type="submit"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
            >
              {activeStep !== dataSteps.length ? "Next" : "Submit"}
            </Button>
          </Box>
        </Card>
      </FormProvider>
    </form>
  );
};

export default Order;
