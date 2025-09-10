"use client"

import React from "react";
import Blog  from "./blog/blogContent";
import { Suspense } from "react";
import LoadingComponent from "./component/loading";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-1">
         <Suspense fallback={<LoadingComponent/>}>
          <Blog />
        </Suspense>
      </main>

    </div>
  );
};

export default HomePage;
