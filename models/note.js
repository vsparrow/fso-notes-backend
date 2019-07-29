const mongoose = require('mongoose')
//below added for https://mongoosejs.com/docs/deprecations.html
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI
// console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
.then( res => { 
	console.log('connected to mongoDB!')
})
.catch( err => { 
	console.log('error connecting to mongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

noteSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Note', noteSchema)