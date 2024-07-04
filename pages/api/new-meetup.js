import { MongoClient } from 'mongodb'
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        // const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb+srv://dumpdivyansh:6vd9Rm0M0hvTBO5t@cluster0.je21rim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db()
        const meetUpCollections = db.collection('meetups')
        const result = await meetUpCollections.insertOne(data)
        console.log(result)
        client.close();
        res.status(201).json({message:'Meetp inserted!'})
    }
}
export default handler