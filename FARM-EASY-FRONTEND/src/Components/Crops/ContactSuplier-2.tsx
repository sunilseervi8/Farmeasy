import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

interface FormData {
    cropName: string;
    unit: string;
    frequency: string;
    sendToOtherSuppliers: boolean;
    quantity: number;
    orderValue: number;
    selectedCurrency: string;
}

interface OrderDetailsStepProps {
  open: boolean;
  handleClose: () => void;
  handlePrevious: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const OrderDetailsStep: React.FC<OrderDetailsStepProps> = ({
  open,
  handleClose,
  handlePrevious,
  formData,
  setFormData,
}) => {
  const [step, setStep] = useState<number>(1); // Manage step: 1 -> Form, 2 -> Thank You
  const [loading, setLoading] = useState<boolean>(false); // Loading state for submission
  const [sellerCompany] = useState<string>("Anirudh Food Corporation Pvt. Ltd"); // Mock seller name

  // Handle form inputs
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, quantity: parseInt(event.target.value) });
  };

  const handleOrderValueChange = (_event: any, newValue: number | number[]) => {
    setFormData({ ...formData, orderValue: newValue as number });
  };

  const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, orderValue: Number(event.target.value) });
  };

  // Simulate form submission and move to the "Thank You" screen
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Go to thank you screen after submission
      console.log(formData); // Log form data on submission
    }, 2000);
  };

  // Handle form close with warning
  const handleFormClose = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? All unsaved data will be lost."
    );
    if (confirmExit) {
      handleClose();
    }
  };

  // Render Order Details Form
  const renderOrderDetailsForm = () => (
    <>
      <DialogTitle className="font-bold text-lg text-gray-800">You Are Almost Done!</DialogTitle>

      <Grid2 className="px-6 mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-orange-400 h-1 rounded-full w-3/4"></div>
        </div>
      </Grid2>

      <DialogContent dividers className="px-6 py-4">
        <p className="text-gray-700 mb-2">Additional Details about your requirement...</p>

        {/* Quantity Input */}
        <TextField
          label={`Quantity (${formData.unit})*`}
          type="number"
          value={formData.quantity}
          onChange={handleQuantityChange}
          fullWidth
          margin="normal"
        />

        {/* Order Value Section with Currency Dropdown */}
        <div className="flex items-center space-x-2 mb-4">
          {/* Currency Dropdown */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              value={formData.selectedCurrency}
              onChange={(e) =>
                setFormData({ ...formData, selectedCurrency: e.target.value as string })
              }
              label="Currency"
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </FormControl>

          {/* Price Input */}
          <TextField
            label="Price"
            type="number"
            value={formData.orderValue}
            onChange={handlePriceInputChange}
            fullWidth
          />
        </div>

        {/* Price Slider */}
        <Slider
          value={formData.orderValue}
          onChange={handleOrderValueChange}
          min={1}
          max={10000000}
          step={1}
          valueLabelDisplay="auto"
        />
      </DialogContent>

      {/* Modal Actions */}
      <DialogActions className="px-6 pb-4">
        <Button variant="contained" onClick={handlePrevious} className="bg-gray-600 hover:bg-gray-700 text-white">
          ← Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit →"}
        </Button>
      </DialogActions>
    </>
  );

  // Render the "Thank You" screen
  const renderThankYouScreen = () => (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex items-center">
          <span className="text-txt-blue text-2xl">✔</span>
          <h2 className="ml-2 text-txt-blue text-2xl font-bold">Thank You.</h2>
        </div>
      </DialogTitle>

      <DialogContent dividers className="text-center p-6">
        <p className="text-gray-700 text-lg mb-4">
          Your Details Are Sent To{" "}
          <a href="#" className="text-txt-blue font-semibold hover:underline">
            {sellerCompany}
          </a>
        </p>

        {/* Business Loan Section */}
        <div className="p-4 bg-red-100 rounded-lg">
          <h3 className="text-lg font-bold text-red-600 mb-2">
            Get an Instant Business Loan up-to 50 Lacs within 48 Hours
          </h3>
          <Button variant="contained" className="bg-red-600 text-white" style={{ padding: "10px 20px" }}>
            Apply now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Dialog open={open} onClose={handleFormClose} maxWidth="sm" fullWidth>
      {step === 1 ? renderOrderDetailsForm() : renderThankYouScreen()}
    </Dialog>
  );
};

export default OrderDetailsStep;
