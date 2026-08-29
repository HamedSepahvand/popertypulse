import PropertyEditForm from "@/components/PropertyEditForm";
const PropertyEditPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-slate-200 py-10">
      <div className="container m-auto max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-2xl shadow-blue-900/10 backdrop-blur">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
