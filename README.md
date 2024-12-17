# ChatApp API

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#Prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contact](#contact)

---

## Overview

A Node.js-based API for a real-time chat application that supports user authentication, messaging, and room management. This project leverages Express.js, Sequelize, and Socket.IO for efficient API handling and real-time communication.

---

## Features

- **User Authentication**: Secure login and registration functionality.
- **Profile Management**: Upload and update profile pictures.
- **Real-Time Messaging:**: Send and receive messages in real-time.
- **Chat Rooms**: Support for uploading profile pictures with validation.
- **File Uploads**: Users can request specific gifts with details.
- **Database Integration**: Persistent storage using Sequelize and MySQL.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database ORM**:Sequelize with MySQL
- **File Uploads**: Multer
- **Authentication**: Custom middleware with JWT tokens
- **Environment Variables**:dotenv

---

## Prerequisites

**Node.js** (v14 or later)

**MySQL database**

**npm or yarn**

---

## Installation

### Clone the Repository:

```bash
git clone https://github.com/waleedka19/chatapp-api.git
cd chatapp-api
```

Create a .env File:
Add the following variables with your own values:

```bash
PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=chatapp
JWT_SECRET=your_jwt_secret
```

Install Dependencies:

Run the following command in the project directory to install required Node.js modules:

```bash

npm install
```

Start the Project:

```bash

npm start
```

## API Endpoints

#### Authentication Routes

| Method | Endpoint  | Description            |
| ------ | --------- | ---------------------- |
| POST   | `/signup` | Register a new user    |
| POST   | `/login`  | Log in and get a token |

#### User Routes

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| PATCH  | `/change-profile-pic` | Upload or update profile picture |

#### Room Routes

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/rooms`               | Get all chat rooms     |
| POST   | `/create-room`         | Create a new chat room |
| POST   | `/join-room`           | Join a room            |
| POST   | `/leave-room/:roomid`  | Leave a room           |
| DELETE | `/delete-room/:roomid` | Delete a room          |
| GET    | `/room/:roomid`        | Get one room           |

#### Message Routes

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/messages/:roomid` | Get all messages in a room    |
| POST   | `/message/:roomid`  | Send a message to a chat room |

## Usage

Navigate to the project directory.

Ensure the .env file is correctly set up.

Start the project using npm start.

Open your browser and go to http://localhost:3000 (or the specified port) to access the application.

## Contact

Author: Waleed karkosh

Email: waliedka@gmail.com

GitHub: github.com/waleedka19
