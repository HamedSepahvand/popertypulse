import PropertyAddForm from "@/components/PropertyAddForm";
import React from "react";

const PropertyAddPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-slate-200 py-10">
      <div className="container m-auto max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-2xl shadow-blue-900/10 backdrop-blur">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyAddPage;
