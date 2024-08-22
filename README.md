# The Acq-COP

- Description

* This application is designed to provide a Common Operation Picture to Acquisition professionals and reduce information silos between program managers and stakeholders.

* The application is divided into two sections. One section is for Program Managers to manager their respective program. The other section is for other general stakeholders, such as a Test Manager, to view programs progress and pertinent schedule updates.

* Based on the type of account created, users can either have a Program Manager (PM) role or general stakeholder role (i.e. Test Manager).

* The Program Manager is able to create a new program, view and update existing programs.

* The Test Manager can filter and view information about multiple programs through the Common Operation Picture.

- Tech Stack

* The application directory is divided into Frontend called frontend_ui and Backend called backend_server.

* The Frontend uses the REACT framework (create-react-app)

* The backend used Docker, Knex and Postgres Database.

* Navigate to the root directory and run #npm install to install all the dependencies.
  The backend server is running in port localhost:8080.
  The frontend is running on port localhost:3000

- Walkthrough

* To begin using the app, navigate to localhost:3000

* The user will land on the Login page. First-time users need to create an account and indicate whether or not they are a Program Manager. All other stakeholders will have a basic, non-PM account.

* Once the account is created, the user can now log into their account.

        PM

  - If the user is a program Manager, their Home page will be blank and has a button to create a new program.

  - New program will have a Title, Description, Start date, and End date.

  - Once the program is created, the list of all programs will be displayed on the PM Home Page.

  - The PM can Select a program to update or delete.

  Test Manager

  - If the user is not a PM, their Home page will be blank and has a filter button to enable them to search for specific activities/tasks.

  - Based on the Test Manager filter criteria, the appropriate activities/tasks will be displayed.

* When the user is done using the application, the user can logout and exit the application.
