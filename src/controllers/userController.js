import connectToDatabase from "@/lib/mongodb";
import nextUser from "@/models/userModel";

export default async function getUser(req, res){
    await connectToDatabase();
    const user = await nextUser.findOne({email: req.body.email});
    res.status(200).json(user);
}