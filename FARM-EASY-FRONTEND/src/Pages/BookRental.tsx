import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // This ensures compatibility with Dayjs
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';

const BookRentals = ({
    rentalData,
    onClose
}: {
    rentalData: {
        rentalTitle: string,
        rentalDescription: string,
        rentalPrice: number,
        rentalImage: string
    },
    onClose: () => void
}) => {
    const [rentalDate, setRentalDate] = useState<Dayjs | null>(null);
    const [rentalTime, setRentalTime] = useState<Dayjs | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to API)
        console.log({
            rentalDate: rentalDate?.format('YYYY-MM-DD'),
            rentalTime: rentalTime?.format('HH:mm')
        });
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <div className="flex justify-between items-center">
                    <span>Book Rental</span>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-col items-center">
                    <img src={rentalData.rentalImage} alt={rentalData.rentalTitle} className="w-32 h-32 rounded-lg mb-4" />
                    <h2 className="text-lg font-bold text-txt-blue">{rentalData.rentalTitle}</h2>
                    <p className="text-gray-600">{rentalData.rentalDescription}</p>
                    <p className="text-xl font-semibold text-txt-blue">${rentalData.rentalPrice}</p>
                    <form className="mt-4 w-full" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Your Name"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Rental Date"
                                value={rentalDate}
                                onChange={(newValue: any) => setRentalDate(newValue)}
                                slotProps={{
                                    textField: { fullWidth: true, margin: 'normal', required: true },
                                }}
                            />
                            <TimePicker
                                label="Rental Time"
                                value={rentalTime}
                                onChange={(newValue: any) => setRentalTime(newValue)}
                                slotProps={{
                                    textField: { fullWidth: true, margin: 'normal', required: true },
                                }}
                            />
                        </LocalizationProvider>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button  sx={{backgroundColor:'#000d6b', color: '#fff'}} onClick={handleSubmit} startIcon={<EventIcon /> }>
                    Confirm Booking
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookRentals;
