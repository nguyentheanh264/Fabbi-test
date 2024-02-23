import { Box, Button } from "@mui/material";

type Props = {
  dataSteps: { step: number; label: string }[];
  activeStep: number;
};

const CustomSteps = (props: Props): JSX.Element => {
  const { dataSteps, activeStep } = props;
  return (
    <Box className="flex">
      {dataSteps?.map((step) => (
        <Button
          key={step?.step}
          variant={activeStep === step?.step ? "contained" : "outlined"}
          sx={{
            borderRadius: 0,
            cursor: "default",
            textTransform: "capitalize",
          }}
          className="rounded-0"
          disableFocusRipple
          disableElevation
          disableRipple
          disableTouchRipple
        >
          {step?.label}
        </Button>
      ))}
    </Box>
  );
};

export default CustomSteps;
