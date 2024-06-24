const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all events
router.get("/", async (req, res) => {
  try {
    //query to fetch all
    const events = await pool.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );

    //respond with fetched events
    res.json(events.rows);
  } catch (error) {
    //handle errors
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
});

//create a new event
router.post("/", async (req, res) => {
  try {
    //extract event details
    const { name, description, date } = req.body;
    //extract creators details
    const { username } = req.user;

    //insert into events table
    const newEvent = await pool.query(
      "INSERT INTO events (name, description, date, attendees) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, date, [username]]
    );

    //respond with new event
    res.json(newEvent.rows[0]);
  } catch (error) {
    //handle errors
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Error creating event" });
  }
});

//get specific event
router.get("/:eventId", async (req, res) => {
  try {
    //extract id for specific event
    const { eventId } = req.params;

    //query the specific event
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [
      eventId,
    ]);

    //handle if none found
    if (event.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    //respond with the specific event
    res.json(event.rows[0]);
  } catch (error) {
    //handle errors
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Error fetching event" });
  }
});

//update specific event with new attendee
router.post("/:eventId/join", async (req, res) => {
  try {
    //extract the event id
    const { eventId } = req.params;
    //extract the new attendee
    const { username } = req.user;

    //fetch the event to get current attendees
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      eventId,
    ]);

    //handle if no event found
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    //extract attendees list
    const event = eventResult.rows[0];
    const currentAttendees = event.attendees;

    //check if the user is already an attendee
    if (currentAttendees.includes(username)) {
      return res.status(400).json({ error: "User is already an attendee" });
    }

    //add user to attendee list
    const updatedAttendees = [...currentAttendees, username];

    //update event with new attendee list
    await pool.query("UPDATE events SET attendees = $1 WHERE id = $2", [
      updatedAttendees,
      eventId,
    ]);

    //respond successfully
    res.json({
      message: "Successfully joined the event",
      attendees: updatedAttendees,
    });
  } catch (error) {
    //handle errors
    console.error("Error joining event:", error);
    res.status(500).json({ error: "Error joining event" });
  }
});

module.exports = router;
