import mongoose from 'mongoose';

const DB_USERNAME = "mati"
const DB_PASSWORD = "lolazo455"
const DB_NAME = "cluster0.v436i3t"
mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Atlas!');
});