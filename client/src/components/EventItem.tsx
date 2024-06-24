import { Link } from "react-router-dom";

const EventItem = ({
  id,
  name,
  date,
}: {
  id: number;
  name: string;
  date: string;
}) => {
  return (
    <Link
      //link to event detail page with specific id
      to={`/events/${id}`}
      className=" bg-white border-2 border-purple-600 p-5 rounded-md w-4/5"
    >
      <div key={id}>
        {/* preview event name */}
        <h2 className="font-bold">{name}</h2>
        {/* date of the event */}
        <p>
          {new Date(date).toLocaleString("en-US", {
            timeZone: "UTC",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
          })}
        </p>
      </div>
    </Link>
  );
};

export default EventItem;
