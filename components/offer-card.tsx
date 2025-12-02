interface OfferCardProps {
  title: string;
  description: string;
  image: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, image }) => {
  return (
    <div className=" bg-zinc-100 rounded-xl overflow-hidden  transition">
      <div className="w-full bg-zinc-200 h-48 relative">
        {/* <img src={image} alt={title} className="w-full h-full object-cover" /> */}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>

        <button className="mt-4 w-1/2 bg-white  rounded-lg py-2 font-medium hover:bg-white transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
