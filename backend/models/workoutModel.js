const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    //First argument: how the schema looks like --> how will look the objects on the database and which information is required with the data type
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
},
{
    //Second argument : Using timestamps: true in the schema automatically adds createdAt and updatedAt fields to the documents, storing the creation and modification timestamps respectively.
    timestamps: true
});

//To export our schema we need to export it as a mongoose model, for that we will have to
//Give it a name (first argument) and specify which structure follows, the schema (the second argument)
module.exports = mongoose.model('Workout', workoutSchema);
//It automatically creates a collection with the number of times the model has been used. For the collection it adds an s on the name so collection is: Workouts

// ? Schema defines the structure
// ? The model represents a specific collection in the database and provides an interface to interact with the data based on the defined schema.

