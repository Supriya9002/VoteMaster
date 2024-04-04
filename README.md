# Voting Application
This project is a web-based voting application that allows users to participate in the voting process for a set of candidates. Users can sign up, log in, vote for candidates, view live vote counts, manage their profiles, and change their passwords. Additionally, there is an admin panel for candidate management.

## Features
User Authentication: Users can sign up and log in using their Aadhar card number and password. Admins cannot vote.
Candidate Listing: Users can view the list of candidates available for voting.
Voting: Users can vote for a specific candidate only once. Once voted, users cannot vote again.
Live Vote Counts: Users can view the live vote counts for each candidate, sorted by their vote count.
User Profile Management: Users can view their profile information and change their passwords.
Admin Panel: Admins can manage the list of candidates, including creating, updating, and deleting candidates.
## Routes
### User Authentication
/signup (POST): Create a new user account.
/login (POST): Log in to an existing account using Aadhar card number and password.
Voting
/candidates (GET): Get the list of candidates.
/vote/:candidateId (POST): Vote for a specific candidate.
Vote Counts
/vote/counts (GET): Get the list of candidates sorted by their vote counts.
User Profile
/profile (GET): Get the user's profile information.
/profile/password (PUT): Change the user's password.
Admin Candidate Management
/candidates (POST): Create a new candidate.
/candidates/:candidateId (PUT): Update an existing candidate.
/candidates/:candidateId (DELETE): Delete a candidate from the list.
Project Structure
server.js: Contains the server-side logic, setting up routes, and managing database connections.
controllers/: Contains controller functions for handling different API endpoints.
models/: Defines MongoDB schemas for users and candidates.
routes/: Defines routes for different API endpoints.
middlewares/: Contains middleware functions for authentication and error handling.
config/: Includes configuration files for database connection and other settings.
Usage
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/voting-application
Install dependencies:

bash
Copy code
npm install
Set up environment variables for database connection and other configurations.

Start the server:

bash
Copy code
npm start
License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Your Name
GitHub: Your GitHub Profile
