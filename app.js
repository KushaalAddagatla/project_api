const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose
	.connect("mongodb+srv://Root:Root@cluster-movies.cdga3ux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Movies", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use("/api", routes) // new

		app.listen(3005, () => {
			console.log("Server has started!")
		})
	})