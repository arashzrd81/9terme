import connectToDB from "@/config/db";
import UserModel from "@/model/User";


const handler = async (req, res) => {
    if (req.method !== "POST") {
        return false;
    }

    try {
        connectToDB();

        let userIP;
        if (req.headers["x-forwarded-for"]) {
            userIP = req.headers["x-forwarded-for"].split(",")[0];
        } else if (req.headers["x-real-ip"]) {
            userIP = req.connection.remoteAddress;
        } else {
            userIP = req.connection.remoteAddress;
        }

        const user = await UserModel.findOne({ userIP });

        if (user) {
            await UserModel.findOneAndUpdate(
            {
                userIP
            },
            {
                usedCalculatorCount: user.usedCalculatorCount + 1
            });
            return res.status(200).json({ message: "Updated Successfully." });
        }
        await UserModel.create({
            userIP,
            usedCalculatorCount: 1
        });
        return res.status(201).json({ message: "Created Successfully." });
    } catch {
        return res.status(500).json({ message: "Unknown Server Error!" });
    }
};


export default handler;