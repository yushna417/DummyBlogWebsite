import React from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Blog  from "./blog/page";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      {/* Render Blog page directly */}
      <main className="flex-1">
        <Blog />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
