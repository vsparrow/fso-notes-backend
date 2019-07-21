const mongoose = require('mongoose')

if(process.argv.length < 3){
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-mzgxn.mongodb.net/note-app?retryWrites=true&w=majority
`
mongoose.connect(url, {useNewUrlParser: true})
console.log('connection made!')


const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})
// console.log(noteSchema)  //is ok

const Note = mongoose.model('Note', noteSchema)
// const Note = mongoose.model('Note', noteSchema)

//CREATE note object - local
// const note = new Note({
// 	content: 'HTML is easy',
// 	date: new Date(),
// 	important: true,
// })

// const note = new Note({
//   content: 'Browser can execute only Javascript',
//   date: new Date(),
//   important: false,
// })

//SAVE NOTE
// note.save().then(res => {
// 	console.log('note saved!')
// 	mongoose.connection.close()
// })


// GET NOTES
// Note.find({}).then(res => {	//find all
Note.find({important: false}).then(res => {   //find based on query
	res.forEach(note => {
		console.log(note)
	})
	mongoose.connection.close()
})





