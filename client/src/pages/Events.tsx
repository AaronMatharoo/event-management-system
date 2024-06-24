import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { useAuth } from "components/AuthProvider";
import { PulseLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import EventItem from "components/EventItem";

const Events = () => {
  //state for event data, loading, and modal for mobile view
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //access auth token
  const { token } = useAuth();

  //fetch events from server when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        //GET request to protected /events endpoint
        const response = await fetch("http://localhost:1337/events", {
          headers: {
            //pass token
            Authorization: `Bearer ${token}`,
          },
        });

        //handle error
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        //set events data
        const data = await response.json();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        //handle error
        setIsLoading(false);
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  //create event form component
  const CreateEventForm = () => {
    //state for loading
    const [isLoading, setIsLoading] = useState(false);
    //form submission and validation
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();

    //submission function
    const onSubmit = async (data) => {
      try {
        setIsLoading(true);
        //POST request to protected /events endpoint
        const response = await fetch("http://localhost:1337/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //pass auth token
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });

        //if successful, reset form, add event to display
        if (response.ok) {
          reset();
          const newEvent = await response.json();
          setEvents((prevEvents) => [newEvent, ...prevEvents]);
          setShowModal(false);
        } else {
          //handle error response
          console.error("Failed to create event:", response.statusText);
        }
      } catch (error) {
        //handle error
        console.error("Failed to create event:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div>
        <h2 className="text-3xl font-bold text-center">Create a New Event</h2>

        {/* event form */}
        <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <h1 className="font-semibold text-xl py-2">Event Name:</h1>
            <input
              type="text"
              id="name"
              className="p-3 text-lg rounded-md w-full"
              {...register("name", {
                required: "Event name is required",
                minLength: {
                  value: 5,
                  message: "Event name must be at least 5 characters",
                },
              })}
            />
            {errors.name && (
              <div className="max-w-max pt-2">
                <p className="text-red-500 font-light">{errors.name.message}</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <h1 className="font-semibold text-xl py-2">Event Description:</h1>
            <textarea
              id="description"
              className="p-3 text-lg rounded-md w-full"
              {...register("description", {
                required: "Event description is required",
                minLength: {
                  value: 5,
                  message: "Event description must be at least 5 characters",
                },
              })}
            />
            {errors.description && (
              <div className="max-w-max pt-2">
                <p className="text-red-500 font-light">
                  {errors.description.message}
                </p>
              </div>
            )}
          </div>

          <div className="max-w-min">
            <h1 className="font-semibold text-xl py-2">Event Date:</h1>
            <input
              type="datetime-local"
              id="date"
              className="p-3 text-lg rounded-md"
              {...register("date", { required: "Event date is required" })}
            />
            {errors.date && (
              <div className="max-w-max pt-2">
                <p className="text-red-500 font-light">{errors.date.message}</p>
              </div>
            )}
          </div>
          <p className="py-5 font-light">
            You will be added as an attendee to your own event
          </p>

          {/* submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-700 py-3 w-full rounded-md hover:bg-purple-500 text-center flex items-center justify-center"
          >
            {isLoading ? (
              <PulseLoader color="rgba(255, 255, 255, 1)" />
            ) : (
              <p className="text-xl text-white">Create Event</p>
            )}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-purple-100 flex flex-col h-full min-h-screen relative">
      <Header />
      <div>
        {/* instructions */}
        <div className="flex flex-col justify-center items-center h-1/4 md:pb-10 pb-5">
          <p
            className="font-light text-lg md:text-3xl md:w-1/2 text-center px-5"
            style={{ textDecorationColor: "#5d00d7" }}
          >
            Here you can view events, create your own events, and click on
            events to view them in more detail and join them there.
          </p>
        </div>
        {/* create event button for mobile */}
        <div className="md:hidden flex justify-center pb-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-700 py-2 px-4 rounded-md hover:bg-purple-500 text-center flex items-center justify-center"
          >
            <p className="text-white font-semibold text-2xl">Create Event</p>
          </button>
        </div>
        {/* event list */}
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">Events List</h1>
            {/* loading spinner for list */}
            {isLoading ? (
              <div className="flex justify-center items-center pt-10">
                <PulseLoader color="rgba(93, 0, 215, 1)" />
              </div>
            ) : (
              <>
                {events.length > 0 ? (
                  <>
                    <div className="grid grid-flow-row gap-5 w-full pb-10">
                      {/* render each event over resuable component */}
                      {events.map((event) => (
                        <div className="flex flex-col items-center">
                          <EventItem
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            date={event.date}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-3xl font-thin text-center pt-10">
                    No events available
                  </p>
                )}
              </>
            )}
          </div>
          {/* desktop create event form */}
          <div className="md:block hidden">
            <CreateEventForm />
          </div>
        </div>
      </div>
      {/* create event modal for mobile */}
      {showModal && (
        <div className="absolute flex justify-center w-full h-min top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gray-300 border-2 border-purple-600 w-min h-min rounded-md p-2">
            <CreateEventForm />
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-white py-3 w-1/2 rounded-md border-2 border-purple-700 text-center flex items-center justify-center"
              >
                <p className="text-sm text-purple-700 font-bold">Close</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
