import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ThankYouScreenProps {
  open: boolean;
  handleClose: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-txt-blue text-2xl">✔</span>
            <h2 className="ml-2 text-txt-blue text-2xl font-bold">Thank You.</h2>
          </div>

          {/* Close Icon */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers className="text-center p-6">
        {/* Details Sent Message */}
        <p className="text-gray-700 text-lg mb-4">
          Your Details Are Sent To{" "}
          <a href="#" className="text-txt-blue font-semibold hover:underline">
            Anirudh Food Corporation Pvt. Ltd
          </a>
        </p>

        {/* Add Products Section */}
        <div className="mb-6">
          <p className="text-gray-700">
            Have a Business? Display your products & start selling in minutes.
          </p>
          <Button
            variant="contained"
            className="bg-custom-blue text-white mt-4"
            style={{ padding: "10px 20px" }}
          >
            Add Your Products
          </Button>
          <p className="text-gray-500 mt-2">
            It will just take 2 minutes of your time
          </p>
        </div>

        {/* Business Loan Section */}
        <div className="p-4 bg-red-100 rounded-lg">
          <h3 className="text-lg font-bold text-red-600 mb-2">
            Get an Instant Business Loan up to 50 Lacs within 48 Hours
          </h3>
          <Button
            variant="contained"
            className="bg-red-600 text-white"
            style={{ padding: "10px 20px" }}
          >
            Apply now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouScreen;
