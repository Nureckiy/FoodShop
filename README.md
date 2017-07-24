# Hohotel
The project is a web application that allows to provide booking operations on the hotel. Besides, there are provide service to place order meals delivery to the room.

# Server development

To work with server it's nessesary to download and install .Net Core SDK.

## Build application
On the first run go to the repository and run <dotnet restore> command.

Navigate to /Api/Hohotel repository and run <dotnet build -c release> command. Compiled files was created on the /bin/Release folder.

## Run server

Run <dotnet run> command for code project or run the Hohotel.dll file.

## Run unit tests
On the first run go to the repository and run <dotnet restore> command.

Navigate to /Api/Hohotel.Tests repository and run <dotnet xunit> command.

# Client development

To work with client it's nessesary to download and install node.js server.

## Build application

Run <npm build> command. Compiled project was been on the /dist folder

## Run application

Run <npm start> command

## Run client on debug mode
On the first run go to the project repository and run <npm i> command.

Navigate to FoodShop.Ui repository, run npm start and open 'http://localhost:3000' page.
