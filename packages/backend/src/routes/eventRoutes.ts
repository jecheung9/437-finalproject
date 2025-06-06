import express, { Request, Response } from "express";
import { EventProvider } from "../EventProvider";

export function registerEventRoutes(app: express.Application, eventProvider: EventProvider) {

    app.get("/api/events", async (req: Request, res: Response) => {
        eventProvider.getAllEvents()
            .then((data) => {
                res.json(data);
            })
            .catch(() => {
                res.status(500).json({ error: "Failed to fetch events" });
            });
    });

    app.post("/api/events", (req: Request, res: Response) => {
        const newEvent = req.body;
        eventProvider.getEventById(newEvent.id)
            .then((data) => {
                if (data) {
                    res.status(409).send("Event with this ID already exists");
                    return;
                }
                return eventProvider.addEvent(newEvent)
                    .then(() => res.status(201).send())
                    .catch(() => res.status(500).send("Something went wrong"));
            })
            .catch(() => {
                res.status(500).send("Something went wrong");
            });
    })

    app.delete("/api/events/:id", (req: Request, res: Response) => {
        const eventId = req.params.id;
        eventProvider.deleteEvent(eventId)
            .then((data) => {
                if (data.deletedCount === 0) {
                    res.status(404).send("Event not found");
                    return;
                }
                res.status(204).send("Event deleted successfully");
            })
            .catch(() => {
                res.status(500).send("Something went wrong");
            });
    })

    app.put("/api/events/:id", (req: Request, res: Response) => {
        const eventId = req.params.id;
        const updatedEvent = req.body;

        eventProvider.updateEvent(eventId, updatedEvent)
            .then((data) => {
                if (data.matchedCount === 0) {
                    res.status(404).send("Event not found");
                    return;
                }  
                res.status(200).json(updatedEvent);
            })
            .catch(() => {
                res.status(500).send("Something went wrong");
            });
    })
}