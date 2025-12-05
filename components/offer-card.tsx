import Image from 'next/image';

interface OfferCardProps {
  title: string;
  description: string;
  image: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, image }) => {
  return (
    <div className=" bg-zinc-100 rounded-lg overflow-hidden  transition">
      <div className="w-full bg-zinc-200 h-48 relative">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          quality={80}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
        <p className="text-zinc-700 mt-2">{description}</p>

        <button
          className="mt-4 w-1/2 bg-white  rounded-lg py-2 font-medium hover:bg-white transition"
          aria-label={`Learn more about ${title}`}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
