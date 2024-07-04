import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

export default function NewMeetUpPage() {
    const route = useRouter()
    async function addMeetphandler(enteredData) {
        console.log(enteredData)
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();

        console.log(data)
        route.push('/')
    }
    return (
        <>
            <Head>
                <title>Add a new Meetup</title>
                <meta name='description'
                    content='add your own meetups'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetphandler} />
        </>
    )
}