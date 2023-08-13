import mongoose from 'mongoose'

export const connectDB = (url, port) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connected to the database now .... in ${port}`)
    })
    .catch((err) => {
      console.log(`${err} did not connect to the database`)
    })
}

//module.exports = {connectDB}