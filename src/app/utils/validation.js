import * as Yup from 'yup';


export const AddblogvalidationSchema = Yup.object().shape({
  title: Yup.object({
    en: Yup.string().required('Title (EN) is required'),
    ar: Yup.string().required('Title (AR) is required'),
  }),
  slug: Yup.object({
    en: Yup.string().required('Slug (EN) is required'),
    ar: Yup.string().required('Slug (AR) is required'),
  }),
  content: Yup.object({
    en: Yup.string().required('Content (EN) is required'),
    ar: Yup.string().required('Content (AR) is required'),
  }),
  bannerImg: Yup.string().required('Banner Image URL is required'),
});