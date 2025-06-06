import { Collection, MongoClient, ObjectId } from "mongodb";

interface IEventDocument {
    _id: ObjectId;
    id: string;
    title: string; 
    numInterested: number;
    dateTime: string;
    location?: string;
    description?: string;
    minPeople?: number;
    maxPeople?: number;
    isInterested: boolean;
    isOwnEvent: boolean;
    
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

    getEventById(id: string) {
        return this.collection.findOne({ id });
    }

    deleteEvent(id: string) {
        return this.collection.deleteOne({ id: id });
    }

    updateEvent(id: string, updatedEvent: Partial<IEventDocument>) {
        const { _id, ...updateData } = updatedEvent;
        return this.collection.updateOne(
            { id },
            { $set: updateData }
        );
    }
}