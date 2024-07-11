import { app } from "./app.js";
import { connectDB } from "./config/db.js";

import "dotenv/config";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running at port: ${port}`);
  await connectDB();
});
