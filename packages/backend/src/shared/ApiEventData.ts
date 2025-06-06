export interface IApiEventData {
    id: string;
    title: string; 
    numInterested: number;
    dateTime: string;
    location?: string;
    description?: string;
    minPeople?: number;
    maxPeople?: number;
    isInterested: boolean;
    author: string;
}


export const initialEvents: IApiEventData[] = [
    {
        id: "1",
        title: "Birthday Party",
        numInterested: 6,
        dateTime: "04/24/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        isInterested: false,
        author: "test123"
    },
    {
        id: "2",
        title: "Wedding",
        numInterested: 400,
        dateTime: "04/26/2025 9:30am",
        location: "12345 Jones Ave.",
        description: "Some form of a description here that is very long to test some stuff 123aaaaaaaaaa",
        maxPeople: 400,
        isInterested: true,
        author: "test12"
    },
    {
        id: "3",
        title: "Game Night",
        numInterested: 1,
        dateTime: "04/27/2025 1:30am",
        maxPeople: 1,
        isInterested: false,
        author: "test12"
    },
    {
        id: "4",
        title: "NBA Playoffs Watch Party",
        numInterested: 4,
        dateTime: "04/26/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        minPeople: 2,
        isInterested: false,
        author: "test122"
    },
];