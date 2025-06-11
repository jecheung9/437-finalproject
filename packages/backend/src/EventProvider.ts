import { Collection, MongoClient, ObjectId } from "mongodb";

interface IEventDocument {
    _id: ObjectId;
    title: string; 
    numInterested: number;
    dateTime: string;
    location?: string;
    description?: string;
    minPeople?: number;
    maxPeople?: number;
    usersInterested: string[];
    author: string;
    
}

export class EventProvider {
    private collection: Collection<IEventDocument>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.EVENTS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing EVENTS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    getAllEvents() {
        return this.collection.find().toArray();
    }

    addEvent(event: IEventDocument) {
        return this.collection.insertOne(event);
    }

    deleteEvent(id: string) {
        return this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    updateEvent(id: string, updatedEvent: Partial<IEventDocument>) {
        const { _id, ...updateData } = updatedEvent;
        return this.collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: updateData }
        );
    }

    convertDateTimeFormat(input: string) {
        const [date, time] = input.split(' '); 
        const [month, day, year] = date.split('/');
        let [hourString, restOfTime] = time.split(':');
        let hour = parseInt(hourString);

        const minute = restOfTime.slice(0, 2);
        const ampm = restOfTime.slice(2);

        if (ampm === "pm" && hour < 12) {
            hour += 12;
        } else if (ampm === "am" && hour === 12) {
            hour = 0;
        }

        hourString = hour.toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hourString}:${minute}`;
    }
    deleteOldEvents() {
        this.getAllEvents().then(events => {
            const now = new Date();
            const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

            events.forEach(event => {
                const formattedTime = this.convertDateTimeFormat(event.dateTime);
                const eventTime = new Date(formattedTime);

                if (eventTime < hourAgo) {
                    this.deleteEvent(event._id.toHexString()).catch(() => {});
                }
            });
        }).catch(() => {});
    }
}