# the-country-info-app

This project is a Full-Stack JS engineer test assessment. The instructions below will guide you through installing, running, and testing the application.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) for cloning the repository

## Installation

1. **Clone the repository:**

   	git clone https://github.com/galofazio/the-country-info-app
   	cd the-country-info-app

2. **Install dependencies:**

	npm install

3. **Set up environment variables:**

	Create a .env file in the backend directory with the following variables:
	
	PORT=5000

	Create a .env file in the frontend directory with the following variables:
	
	REACT_APP_API_URL=http://localhost:5000

4. **Run the app:**

	Run the server with the following command in the backend directory:

	npm run dev 

	Run the front-end with the following command in the frontend directory:

	npm start