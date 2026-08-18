import { Icon } from "@iconify/react/dist/iconify.js";

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const repeatedItems = [...items, ...items];

  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        className={`flex w-max shrink-0 items-center animate-marquee ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {repeatedItems.map((text, index) => (
          <span
            key={`${text}-${index}`}
            className="flex shrink-0 items-center px-8 gap-x-16 md:px-16 md:gap-x-32"
          >
            {text}
            <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
