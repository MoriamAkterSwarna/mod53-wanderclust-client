import DestinationCard from "../components/DestinationCard";
import CategoryFilter from "./CategoryFilter";


const DestinationPage = async ({ searchParams }) => {
  const params = await searchParams; 
  const category = params?.category || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE}/api/destinations?category=${category}`,
    { cache: "no-store", }
  );

  const destinations = await res.json();

  return (
    <div className="min-w-6xl px-4 mx-auto mb-20">
      <h2 className="text-3xl font-semibold mt-10">
        Explore All Destinations
      </h2>

      <p className="text-muted">
        Find your perfect travel experience from our curated collection
      </p>

      <CategoryFilter category={category} />

      <p className="text-muted text-sm my-3">
        Showing {destinations.length} destinations
      </p>

      <div className="grid grid-cols-3 gap-5">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;