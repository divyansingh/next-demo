import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from 'mongodb'
export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetUpData.title}</title>
                <meta name='description'
                    content={props.meetUpData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetUpData.image}
                title={props.meetUpData.title}
                address={props.meetUpData.address}
                description={props.meetUpData.description}
            />
        </>
    )
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://dumpdivyansh:6vd9Rm0M0hvTBO5t@cluster0.je21rim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()
    const meetUpCollections = db.collection('meetups')
    const meetups = await meetUpCollections.find({}, { _id: 1 }).toArray();
    // console.log(meetups)
    client.close()
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {
                meetUpId: meetup._id.toString()
            }
        }))

        // [
        //     {
        //         params:{
        //             meetUpId:'m1'
        //         }
        //     },
        //     {
        //         params:{
        //             meetUpId:'m2'
        //         }
        //     },
        // ]
    }
}
export async function getStaticProps(context) {
    const meetUpId = context.params.meetUpId;
    const client = await MongoClient.connect('mongodb+srv://dumpdivyansh:6vd9Rm0M0hvTBO5t@cluster0.je21rim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()
    const meetUpCollections = db.collection('meetups')
    const selectedMeetup = await meetUpCollections.findOne({ _id: new ObjectId(meetUpId) });
    console.log(selectedMeetup)
    client.close()
    return {
        props: {
            meetUpData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
            //  {
            //     image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/UCDNewmanHouse.jpg',
            //     id: meetUpId,
            //     title: 'First Meetup',
            //     address: 'University College Dublin, Belfield, Dublin 4, Ireland',
            //     description: 'First Meetup'
            // }

        }
    }
} 
