import { APP_PORT } from "./config/constants";
import app from "./app/app";

app.listen(APP_PORT, () => {
    console.log("the server is running at " + APP_PORT)
})