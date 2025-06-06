"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Footer from "../component/footer/footer";
import Navbar from "../component/navbar/nav";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";
import { apiCall } from "../utils/ApiCall";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .required("Required"),
  countryCode: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .required("Required"),
  service: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export default function ContactUsPage() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict.contactUs;
  const services = dict.services;

  const handleSubmit = async (values) => {
    try {
      await apiCall("/user/contactUs", "post", { values });
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <head>
        <title>Contact Us - FORGE Trading and Construction</title>
        <meta name="description" content="Contact Forge Trading and Construction for inquiries and service requests." />
      </head>
      <Navbar />
      <div className="min-h-screen py-20 xl:px-20 md:px-8">
        <div className="lg:flex mt-8">
          <div className="p-6 lg:m-0 m-6 xl:basis-1/2 basis-1/3 rounded-xl bg-white/20 shadow-lg backdrop-blur-md text-gray-800">
          <h3 className="uppercase text-sm font-bold text-gray-700">{lang.contactUs}</h3>
          <h1 className="text-5xl font-extrabold text-purple-900 mt-3 mb-6">{lang.gtt}</h1>
          <p className="text-lg text-gray-700 mb-6">
            {lang.desc}
          </p>

          <div className="space-y-4 mb-5">
            <div className="bg-white/40 backdrop-blur-md shadow rounded-xl flex items-center p-4">
              <span className="text-2xl mr-3">📧</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{lang.email}</p>
                <p className="text-gray-700 break-all">info@forgetradingandconstruction.com</p>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-md shadow rounded-xl flex items-center p-4">
              <span className="text-2xl mr-3">📞</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{lang.phone}</p>
                <p className="text-gray-700">{lang.phoneNumber}</p>
              </div>
            </div>
          </div>

           <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.1633790008304!2d46.79817697514969!3d24.78985847797546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2effd8ae7ab0d5%3A0x27d707469ca4567d!2zUkZCQjM2OTXYjCAzNjk1INi02LnYsdin2YbYjCA2OTUy2Iwg2K3ZiiDYp9i02KjZitmE2YrYqSwgUml5YWRoIDEzMjI2LCBTYXVkaSBBcmFiaWE!5e0!3m2!1sen!2sin!4v1749197549051!5m2!1sen!2sin"
          height="200px"
          width="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
        </div>
          <div className="xl:basis-1/2 basis-2/3 mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            {lang.getInTouch}
          </h2>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNumber: "",
              countryCode:"",
              countryCode: "",
              service: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {() => (
              <Form className="space-y-5 bg-white/10 backdrop-blur-md p-6 text-black rounded-xl shadow-lg border border-white/20">
                <div>
                  <label className="block text-sm font-medium text-black">
                    {lang.fullName}
                  </label>
                  <Field
                    name="fullName"
                    type="text"
                    className="mt-1 p-2 border w-full rounded-md"
                    placeholder={lang.fullName}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div
                  className={`grid md:grid-cols-2 gap-4 ${
                    lang === "ar" ? "text-right" : ""
                  }`}
                >
                  <div>
                    <label className="block text-sm font-medium text-black">
                      {lang.email}
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 p-2 border w-full rounded-md"
                      placeholder={lang.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex ">
                    <div className="me-3">
                      <label className="block text-sm whitespace-nowrap font-medium text-black">
                        {lang.countryCode}
                      </label>
                      <Field
                        name="countryCode"
                        type="text"
                        className="mt-1 p-2 border w-[80px] rounded-md"
                        placeholder=""
                        pattern="\d*"
                        inputMode="numeric"
                      />
                      <ErrorMessage
                        name="countryCode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black">
                        {lang.phone}
                      </label>
                      <Field
                        name="phoneNumber"
                        type="text"
                        className="mt-1 p-2 border w-full rounded-md"
                        placeholder={lang.phone}
                        pattern="\d*"
                        inputMode="numeric"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    {lang.service}
                  </label>
                  <Field
                    name="service"
                    as="select"
                    className="mt-1 p-2 border w-full rounded-md "
                  >
                    <option value="">{lang.selectService}</option>
                    {services.map((s, i) => (
                      <option key={i} className="text-black" value={s}>
                        {s}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="service"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    {lang.message}
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={4}
                    className="mt-1 p-2 border w-full rounded-md"
                    placeholder={lang.message}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-yellow-700 text-white bold px-6 py-2 rounded-md hover:bg-purple-900 transition"
                >
                  {lang.submit}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
}
