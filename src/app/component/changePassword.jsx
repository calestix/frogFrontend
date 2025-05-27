"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from './navbar/nav';
import Footer from './footer/footer';
import { apiCall } from '../utils/ApiCall';


const ChangePasswordForm = () => {
  const [showNew, setShowNew] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate=useRouter()

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, 'New password must be at least 8 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });
   const searchParams = useSearchParams();
    const email = searchParams.get('email');

  const handleChangePassword=async(values)=>{
    let formData = {
      newPassword:values.newPassword,
      email:email
    }
    const response=  await apiCall("/user/auth/resetPassword", "post", formData);
    if(response.status==200){
      navigate.push("/")
    }
  }
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen main-bg">
      <div className="bg-yellow-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
          Change Password
        </h2>

        <Formik
          initialValues={{  newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleChangePassword(values)
          }}
        >
          {() => (
            <Form className="space-y-5">
              {/* New Password */}
              <div className="relative">
                <Field
                  name="newPassword"
                  type={showNew ? 'text' : 'password'}
                  placeholder="New Password"
                  className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff color='black' size={20} /> : <Eye color='black' size={20} />}
                </div>
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter New Password"
                  className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff color='black' size={20} /> : <Eye size={20} color='black' />}
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                Change Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ChangePasswordForm;
