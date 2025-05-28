"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import bg from "/public/contactus.jpg"; // Your high quality image
import Footer from "../component/footer/footer";
import Navbar from "../component/navbar/nav";
import { useLanguage } from "../context/LanguageContext";
import { getDictionary } from "../lib/dictionary";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  service: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export default function ContactUsPage() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const lang = dict.contactUs;
  const services = dict.services;

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20">
        <h3 className="text-4xl text-center mt-4 text-white font-bold">{lang.contactUs}</h3>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            {lang.getInTouch}
          </h2>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              service: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {() => (
              <Form className="space-y-5 bg-white/10 backdrop-blur-md p-6 text-white rounded-xl shadow-lg border border-white/20">
                <div>
                  <label className="block text-sm font-medium text-white">
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
                    <label className="block text-sm font-medium text-white">
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
                  <div>
                    <label className="block text-sm font-medium text-white">
                      {lang.phone}
                    </label>
                    <Field
                      name="phone"
                      type="text"
                      className="mt-1 p-2 border w-full rounded-md"
                      placeholder={lang.phone}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">
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
                  <label className="block text-sm font-medium text-white">
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
                  className="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900 transition"
                >
                  {lang.submit}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}
