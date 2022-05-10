import { App } from './src/app';

const app = new App();

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.startup(PORT);