// import { useEffect, useState } from "react";
import { MongoClient } from 'mongodb'
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
function HomePage(props) {
    // const [laodedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETTUP)
    // }, [])

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name='description'
                    content='Browse a huge list of higly active React meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}
const DUMMY_MEETTUP = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/UCDNewmanHouse.jpg',
        address: 'University College Dublin, Belfield, Dublin 4, Ireland'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Imperial_College_Royal_School_of_Mines.jpg/800px-Imperial_College_Royal_School_of_Mines.jpg',
        address: 'Exhibition Rd, South Kensington, London SW7 2AZ, United Kingdom'
    }
]
// export async function getStaticProps(){
//     return {
//         props:{
//             meetups:DUMMY_MEETTUP
//         }
//     }
// }
export async function getServerSideProps(context) {
    // console.log(context.req,context.res)
    const client = await MongoClient.connect('mongodb+srv://dumpdivyansh:6vd9Rm0M0hvTBO5t@cluster0.je21rim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()
    const meetUpCollections = db.collection('meetups')
    const meetups = await meetUpCollections.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    }
}
export default HomePage