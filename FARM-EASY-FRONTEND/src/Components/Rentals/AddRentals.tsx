import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    FormControl,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addCrop } from '../../Service/CropService';


const indianNumberPlateRegex = /^[A-Z]{2}[0-9]{2} [A-Z]{1,2}[0-9]{1,4}$/;

const validationSchema = Yup.object({
    userId: Yup.string().required('userID is required'),
    rentalTitle: Yup.string().required('Rental name is required'),
    rentalDescription: Yup.string().required('Description is required'),
    rentalLocation: Yup.number().required('Location is required').positive('Quantity must be positive'),
    rentalNumberPlate: Yup.string().required('Number Plate is required').matches(indianNumberPlateRegex, 'Invalid Indian number plate format (e.g., MH12 AB1234)'),
    reantalPrice: Yup.number().required('Price is required').positive('Price must be positive'),
    image: Yup.mixed().required('Image is required')
});




interface RentalFormProps {
    handleClose: () => void; // Function to close modal
}

const RentalForm: React.FC<RentalFormProps> = ({ handleClose }) => {
    const [imageSrc, setImageSrc] = useState<string | null>('../../../public/Images/upload.webp'); // Set default image initially

    const formik = useFormik({
        initialValues: {
            userId: '',
            rentalTitle: '',
            rentalDescription: '',
            rentalPrice: '',
            rentalLocation: '',
            rentalNumberPlate: '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            addCrop(values);
            // formik.resetForm(); // Reset form on submit
            // handleClose(); // Close modal after submission
        }
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

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px' }}
        >
            {/* Close Button (Top-Left) */}
            <IconButton
                edge="start"
                onClick={handleClose}
                aria-label="close"
                sx={{ position: 'absolute', top: '10px', left: '10px' }}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h5" className="text-teal-600 text-center color-txt-blue">
                Add Rental Details
            </Typography>

            {/* Image Upload and Preview */}
            <FormControl>
                <img
                    src={imageSrc || '../../../public/Images/upload.webp'}
                    alt="Crop preview"
                    style={{ maxWidth: '100%', marginBottom: '20px', height: '200px' }}

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

            {/* user ID Field */}
            <TextField
                fullWidth
                id="userId"
                name="userID"
                label="User ID"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userId && Boolean(formik.errors.userId)}
                helperText={formik.touched.userId && formik.errors.userId}
                className="text-teal-600"
            />

            {/* Rental Name Field */}
            <TextField
                fullWidth
                id="rentalTitle"
                name="rentalTitle"
                label="Name"
                value={formik.values.rentalTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalTitle && Boolean(formik.errors.rentalTitle)}
                helperText={formik.touched.rentalTitle && formik.errors.rentalTitle}
                className="text-teal-600"
            />
            {/* Rental description Field */}
            <TextField
                fullWidth
                id="rentalDescription"
                name="rentalDescription"
                label="Description"
                value={formik.values.rentalDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalDescription && Boolean(formik.errors.rentalDescription)}
                helperText={formik.touched.rentalDescription && formik.errors.rentalDescription}
                className="text-teal-600"
            />

            {/* Location Field */}
            <TextField
                fullWidth
                id="rentalLocation"
                name="rentalLocation"
                label="Location"
                value={formik.values.rentalLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalLocation && Boolean(formik.errors.rentalLocation)}
                helperText={formik.touched.rentalLocation && formik.errors.rentalLocation}
            />

            {/* Rental Number Plate Field */}
            <TextField
                fullWidth
                id="rentalNumberPlate"
                name="rentalNumberPlate"
                label="Number PLlate"
                value={formik.values.rentalNumberPlate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalNumberPlate && Boolean(formik.errors.rentalNumberPlate)}
                helperText={formik.touched.rentalNumberPlate && formik.errors.rentalNumberPlate}
                className="text-teal-600"
            />

            {/* Price Field */}
            <TextField
                fullWidth
                id="rentalPrice"
                name="rentalPrice"
                label="Price"
                type="number"
                value={formik.values.rentalPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rentalPrice && Boolean(formik.errors.rentalPrice)}
                helperText={formik.touched.rentalPrice && formik.errors.rentalPrice}
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-custom-blue text-white py-3 px-2 rounded-md"
            >
                Submit
            </button>
        </Box>
    );
};

export default RentalForm;
