"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';    
import Navbar from '../component/navbar/nav';
import { apiCall } from '../utils/ApiCall';
import { useAuthActions } from '../context/useAuthActions';


const AdminLogin = () => {
    const navigate=useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    });
    const { LoginSave } = useAuthActions();

    const handleSubmit = async (values) => {
        let formData={...values}
      let response= await apiCall("/admin/auth/login","post",formData)
      if(response.success){
        await LoginSave(response, "1")
        navigate.push("/admin/dashboard")
      }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center main-bg p-6">
                <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Admin Login</h2>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnBlur={false}
                        validateOnChange={false} onSubmit={handleSubmit}>
                        <Form className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Your Password"
                                    className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300"
                            >
                                Login
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
         
        </>
    );
};

export default AdminLogin;
