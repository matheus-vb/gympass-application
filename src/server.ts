import { app } from "./app";

app.listen({
    host: "0.0.0.0",
    port: 5050,
}).then(() => {
    console.log("Server running on port 5050");
})