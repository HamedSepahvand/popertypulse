import Link from "next/link";
import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-50"
            textColor="text-gray-900"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              bg: "bg-black",
              textColor: "text-white",
            }}
            children="Find your dream rental property. Bookmark properties and contact
              owners."
          />
          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-50"
            textColor="text-blue-950"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              bg: "bg-blue-800",
              textColor: "text-white",
            }}
            children="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
