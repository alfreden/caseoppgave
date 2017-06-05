# FullstackReact

# Oppgavetekst

We have an internal system where we need to build a new frontend.
The system keep track of servers and services installed on the servers.
Server and service as well as relationship information is kept in MS SqlServer database with the following simplified datamodel:

Table 1: Servers
Id Int,
Name String

Example data:
1, Server1
2, Server2

Table 2: Services
Id int
Name String

Example data
1, Service1
2, Service2

Table 3: ServerAndServices
Server_id int references table Servers
Service_id int references table Services

Example data
1, 1
1, 2
2, 1

Functional Requirements: 
Simple CRUD operations; Servers and Services as well as relationship
Search; Services and Servers
Master detail listing; all services on a specific server, all servers with a specific service installed

Non functional requirements
The frontend should be built as Html5 app using React, single or multipage
The Html5 app should communicate with the database using WebApi - https://www.asp.net/web-api
The app is for internal use; extensibility; app and datamodel, is more important than security/visual design/performance

Other info
- No need to implement security
- No need to implement change control
- No need to do optimization

Task:
Build a simple working demo app using the info above.
Upload to GitHub and provide us with a link.
We should be able to install and run the app with info provided in a readme file on github.

Questions:
What is the biggest challenge in this task?
How do you ensure the app/db model can be extended?