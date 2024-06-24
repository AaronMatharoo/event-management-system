import { useAuth } from "components/AuthProvider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const EventDetailPage = () => {
  //state for event data, loading, and joining
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  //event id from route params
  const { id } = useParams();
  //auth token and user information
  const { token, user } = useAuth();

  //fetch specific event information when page loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        //GET request to protected /events/:id endpoint
        const response = await fetch(`http://localhost:1337/events/${id}`, {
          headers: {
            //pass token
            Authorization: `Bearer ${token}`,
          },
        });

        //handle error
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Failed to fetch event");
        }
        //otherwise setEvent data
        const eventData = await response.json();
        setEvent(eventData);

        //check if the current user has joined the event
        if (eventData.attendees.includes(user.username)) {
          setJoined(true);
        }
        setIsLoading(false);
      } catch (error) {
        //handle errors
        setIsLoading(false);
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id, token, user.username]);

  //handle joining an event
  const joinEvent = async () => {
    try {
      setIsJoining(true);
      //POST request to protected /events/:id/join endpoint
      const response = await fetch(`http://localhost:1337/events/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //pass token
          Authorization: `Bearer ${token}`,
        },
      });
      //handle error
      if (!response.ok) {
        setIsJoining(false);
        throw new Error("Failed to join event");
      }
      //set new attendee for data on the page
      const data = await response.json();
      setEvent((prevEvent) => ({
        ...prevEvent,
        attendees: data.attendees,
      }));
      setIsJoining(false);
      setJoined(true);
    } catch (error) {
      //handle error
      setIsJoining(false);
      console.error("Error joining event:", error);
    }
  };

  //check if event has passed
  const eventDate = new Date(event?.date);
  const currentDate = new Date();
  const isPastEvent = eventDate < currentDate;

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col">
      {/* instruction area */}
      <div className="flex flex-col space-y-6 justify-center items-center h-1/4 py-12">
        <p
          className="font-light md:text-5xl text-3xl underline"
          style={{ textDecorationColor: "#5d00d7" }}
        >
          Event In Detail
        </p>
        <p className="font-bold md:text-3xl text-xl text-center">
          Review the event in further detail, and join the event if you wish
        </p>
      </div>
      <div className="md:pt-10 pt-2">
        {isLoading ? (
          <div className="flex justify-center items-center pt-10">
            <PulseLoader color="rgba(93, 0, 215, 1)" />
          </div>
        ) : (
          <div className="md:px-20 px-5">
            {event ? (
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-10">
                <div className="text-2xl font-light">
                  <h2
                    className="md:text-4xl text-2xl font-semibold underline md:text-left text-center"
                    style={{ textDecorationColor: "#5d00d7" }}
                  >
                    {event.name}
                  </h2>
                  {/* event in detail */}
                  <div className="py-4 space-y-3">
                    <p>
                      <span className="font-semibold">Date: </span>
                      {new Date(event.date).toLocaleString("en-US", {
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
                    <p>
                      <span className="font-semibold">Description: </span>{" "}
                      {event.description}
                    </p>
                    <p>
                      <span className="font-semibold">Attendees: </span>{" "}
                      {event.attendees.join(", ")}
                    </p>
                  </div>
                </div>
                {/* current actions that can be taken */}
                <div className="flex flex-col items-center space-y-8 pb-5">
                  <h1
                    className="md:text-4xl text-2xl font-semibold underline text-center"
                    style={{ textDecorationColor: "#5d00d7" }}
                  >
                    {/* handle if event has passed */}
                    {isPastEvent
                      ? "Sorry, the date for this event has passed"
                      : joined
                      ? "You have already joined this event"
                      : "Would you like to join this event?"}
                  </h1>
                  {/* handle button styles if event has passed */}
                  {!isPastEvent && !joined && (
                    <button
                      className={`py-3 w-1/3 rounded-md ${
                        isJoining
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-700 hover:bg-purple-500"
                      } text-center flex items-center justify-center`}
                      onClick={joinEvent}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <PulseLoader color="rgba(255, 255, 255, 1)" />
                      ) : (
                        <p className="text-xl text-white">Join!</p>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // handle error
              <p>This event cannot be displayed in detail.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
