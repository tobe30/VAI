import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./lib/db.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running testing")
  // res.status(200).json({msg:"api is up and running"})
})

const PORT= process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    console.log("DB connected")

     app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", err);
  }
}
startServer();





  // -------TESTED PISTON BUT RATE LIMIT ALREADY REACHED ---------//
// app.post("/api/execute", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://emkc.org/api/v2/piston/execute",
//       req.body
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.log("Piston Error:", error.response?.status);
//     console.log("Piston Data:", error.response?.data);

//     res.status(error.response?.status || 500).json({
//       error: "Execution failed",
//       details: error.response?.data || error.message,
//     });
//   }
// });