import React from "react";
import Footer from "../component/footer/footer";
import Navbar from "../component/navbar/nav";
function Blog() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20">
        <h3 className="text-4xl text-center mt-4 text-white font-bold">Blog</h3>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
