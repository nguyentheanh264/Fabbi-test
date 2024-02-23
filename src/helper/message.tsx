import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

interface MessageProps {
  title?: string;
  message: string;
}

const SuccessMessage = (props: MessageProps) => {
  const { message, title } = props;
  return (
    <div className="flex items-center">
      <CheckCircleOutlinedIcon
        style={{ height: 30, width: 30 }}
        color="primary"
      />
      <div className="px-12" style={{ color: "#242424" }}>
        <Typography variant="subtitle2" className="mb-3">
          {title ?? "Success"}
        </Typography>
        <Typography variant="body2" style={{ color: "#747475" }}>
          {message}
        </Typography>
      </div>
    </div>
  );
};

export const successMsg = (msg: string) => {
  if (msg)
    toast(<SuccessMessage message={msg} />, {
      closeButton: () => (
        <div className="px-12 my-auto border-l">
          <CloseOutlinedIcon fontSize="small" />
        </div>
      ),
    });
};
