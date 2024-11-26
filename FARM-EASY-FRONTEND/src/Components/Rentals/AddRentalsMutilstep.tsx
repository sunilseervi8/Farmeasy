import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    FormControl,
    Typography,
    Button,
} from '@mui/material';
import { addCrop } from '../../Service/CropService';

const indianNumberPlateRegex = /^[A-Z]{2}[0-9]{2} [A-Z]{1,2}[0-9]{1,4}$/;

const validationSchema = Yup.object({
    rentalTitle: Yup.string().required('Rental name is required'),
    rentalDescription: Yup.string().required('Description is required'),
    pickUpLocation:Yup.string().required(),
    rentalNumberPlate: Yup.string()
        .required('Number Plate is required')
        .matches(indianNumberPlateRegex, 'Invalid Indian number plate format (e.g., MH12 AB1234)'),
    rentalPrice: Yup.number().required('Price is required').positive('Price must be positive'),
    image: Yup.mixed().required('Image is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    rentalDate: Yup.string().required('Rental date is required'),
});

interface RentalFormProps {
    handleClose: () => void;
}

const RentalForm: React.FC<RentalFormProps> = ({ handleClose }) => {
    const [step, setStep] = useState<number>(1);
    const [imageSrc, setImageSrc] = useState<string | null>('../../../public/Images/upload.webp');

    const formik = useFormik({
        initialValues: {
            rentalTitle: '',
            rentalDescription: '',
            pickUpLocation:'',
            rentalPrice: '',
            rentalNumberPlate: '',
            image: null,
            startTime: '',
            endTime: '',
            rentalDate: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form Values: ', values); // Ensure values are logged here
            addCrop(values); // Call service to submit data
            formik.resetForm(); // Reset form on successful submission
        },
    });

    // Handle file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0];
            formik.setFieldValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle moving to the next step
    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    // Function to handle going back to the previous step
    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Render stepper animation
    const renderStepper = () => (
        <div className="flex justify-center items-center mb-8">
            <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'} flex items-center justify-center text-white transition-all duration-300`}>
                1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'} transition-all duration-300`} />
            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'} flex items-center justify-center text-white transition-all duration-300`}>
                2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'} transition-all duration-300`} />
            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'} flex items-center justify-center text-white transition-all duration-300`}>
                3
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-green-600' : 'bg-gray-300'} transition-all duration-300`} />
            <div className={`w-8 h-8 rounded-full ${step === 4 ? 'bg-green-600' : 'bg-gray-300'} flex items-center justify-center text-white transition-all duration-300`}>
                4
            </div>
        </div>
    );

    // Rendering different steps
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100  customimagBack" >
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative">
                <Typography variant="h5" className="text-green-600 text-center mb-4">
                    Add Rental Details
                </Typography>

                {/* Stepper Animation */}
                {renderStepper()}

                {/* Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4"
                    noValidate
                >
                    {step === 1 && (
                        <>
                            {/* Step 1: Basic Details */}
                            <TextField
                                fullWidth
                                id="rentalTitle"
                                name="rentalTitle"
                                label="Rental Title"
                                value={formik.values.rentalTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rentalTitle && Boolean(formik.errors.rentalTitle)}
                                helperText={formik.touched.rentalTitle && formik.errors.rentalTitle}
                            />
                            <TextField
                                fullWidth
                                id="rentalDescription"
                                name="rentalDescription"
                                label="Rental Description"
                                value={formik.values.rentalDescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rentalDescription && Boolean(formik.errors.rentalDescription)}
                                helperText={formik.touched.rentalDescription && formik.errors.rentalDescription}
                            />
                            <TextField
                                fullWidth
                                id="pickUpLocation"
                                name="pickUpLocation"
                                label="Pick Up Location"
                                value={formik.values.rentalDescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.pickUpLocation && Boolean(formik.errors.pickUpLocation)}
                                helperText={formik.touched.pickUpLocation && formik.errors.pickUpLocation}
                            />
                            <Button onClick={handleNextStep} className="bg-green-600 text-white py-2 rounded">
                                Next
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Step 2: Rental Details */}
                            <TextField
                                fullWidth
                                id="rentalNumberPlate"
                                name="rentalNumberPlate"
                                label="Number Plate"
                                value={formik.values.rentalNumberPlate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rentalNumberPlate && Boolean(formik.errors.rentalNumberPlate)}
                                helperText={formik.touched.rentalNumberPlate && formik.errors.rentalNumberPlate}
                            />
                            <TextField
                                fullWidth
                                id="rentalPrice"
                                name="rentalPrice"
                                label="Rental Price"
                                type="number"
                                value={formik.values.rentalPrice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rentalPrice && Boolean(formik.errors.rentalPrice)}
                                helperText={formik.touched.rentalPrice && formik.errors.rentalPrice}
                            />
                            <FormControl>
                                <img
                                    src={imageSrc || '../../../public/Images/upload.webp'}
                                    alt="Crop preview"
                                    style={{ maxWidth: '70%', marginBottom: '20px', height: '100px' }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <Typography color="error">{formik.errors.image}</Typography>
                                )}
                            </FormControl>
                            <div className="flex justify-between">
                                <Button onClick={handlePreviousStep} className="bg-gray-400 text-white py-2 rounded">
                                    Back
                                </Button>
                                <Button onClick={handleNextStep} className="bg-green-600 text-white py-2 rounded">
                                    Next
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            {/* Step 3: Date and Time Details */}
                            <TextField
                                fullWidth
                                id="startTime"
                                name="startTime"
                                label="Start Time"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                            />
                            <TextField
                                fullWidth
                                id="endTime"
                                name="endTime"
                                label="End Time"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                            />
                            <TextField
                                fullWidth
                                id="rentalDate"
                                name="rentalDate"
                                label="Rental Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.rentalDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rentalDate && Boolean(formik.errors.rentalDate)}
                                helperText={formik.touched.rentalDate && formik.errors.rentalDate}
                            />
                            <div className="flex justify-between">
                                <Button onClick={handlePreviousStep} className="bg-gray-400 text-white py-2 rounded">
                                    Back
                                </Button>
                                <Button onClick={handleNextStep} className="bg-green-600 text-white py-2 rounded">
                                    Next
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            {/* Step 4: Preview Details */}
                            <Typography variant="h6" className="text-green-600 mt-4">
                                Preview:
                            </Typography>
                            <Typography>Title: {formik.values.rentalTitle}</Typography>
                            <Typography>Description: {formik.values.rentalDescription}</Typography>
                            <Typography>Number Plate: {formik.values.rentalNumberPlate}</Typography>
                            <Typography>Price: {formik.values.rentalPrice}</Typography>
                            <Typography>Start & End Time: {formik.values.startTime} - {formik.values.endTime}</Typography>
                            <Typography>Date: {formik.values.rentalDate}</Typography>
                            <div className="flex justify-between mt-4">
                                <Button onClick={handlePreviousStep} className="bg-gray-400 text-white py-2 rounded">
                                    Back
                                </Button>
                                <Button type="submit" className="bg-green-600 text-white py-2 rounded">
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RentalForm;
