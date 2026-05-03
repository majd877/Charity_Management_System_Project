import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    subCategory: yup.string().required('Subcategory is required'),
    phone: yup.string().required('Phone is required'),
    message: yup.string().required('Message is required'),
    whatsapp: yup.string().optional(),
    // email: yup.string().email('Invalid email format'),
    // image: yup.string().optional(),
    longitude: yup.number().required('Longitude is required'),
    latitude: yup.number().required('Latitude is required'),
    acceptOne: yup.boolean().required('Accept One is required'),
    acceptTwo: yup.boolean().required('Accept Two is required'),
    acceptThree: yup.boolean().required('Accept Three is required'),
    recaptcha: yup.boolean().required('Recaptcha is required'),
    device_id: yup.string().required('Device ID is required'),
});
