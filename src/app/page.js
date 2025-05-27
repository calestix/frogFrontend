"use client"
import Navbar from "./component/navbar/nav";
import Footer from "./component/footer/footer";
import Banner from "./component/banner/banner";
import Overview from "./component/overview.js";
import OurServices from "./component/our-services";
import Gallery from "./component/gallery";
import Location from "./component/location"

export default function Home() {
  return (
    <>
          <Navbar />
          <Banner/>
          <Overview/>
          <OurServices/>
          <Gallery/>
          <Location/>
          <Footer />
    </>
  );
}
