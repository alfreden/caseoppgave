#Howto

installer Node https://nodejs.org/en/
installer asp.net web.api https://www.asp.net/web-api

1. �pne opp prosjektfilen FullstackCasen.sln
2. h�yre klikk p� filen og trykk rebuild
3. g� inn i mappen FullstackCasen og skrive cmd i addresse linjen p� toppen
4. i CMD vinduet som �pner seg skriv inn "dotnet ef database update"(Dette for og opprette databasen)
	4.1 Hvis du f�r feilmelding har du mest sannsynlig en annen database eller ett annet navn p� databasen.
	4.2 Inne i Prosjektfilen (FullstackCasen.sln) Trykk p� View og SQL Server Object explorer
	4.3 Inne i SQL Server Object exploreren trykk p� SQL Server. Du vil da se navnet p� serveren.
	4.4 �pne opp filen appsettings.json og endre det som st�r bak "DefaultConnection" til navnet p� SQL serveren.
5. N�r dette er gjort m� du �pne opp mappen til react og skrive cmd i addresse vinduet p� toppen
6. skriv NPM start inne i cmd vinduet
7. �pne opp filen index.html i en nettleser

Du skal n� kunne se nettsiden.
Databasene som ble opprettet i sted er helt tomme, s� innholdet p� nettsiden er deretter.
Skriv inn noe i tekstfeltene p� toppen og oppdater siden for � se mer innhold.

#kommentar
Oppgaven ble noe fort gjort da jeg jobber p� denne og forbreder fremvisning av bacheloren min samtidig.
Det ble noen ting som ikke rakk og komme med av den grunn. S�k p� relasjoner og server/service listen ble ikke ferdig.

Jeg hadde ogs� gjort meg mer flid med delt opp index.js i flere komponenter.

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