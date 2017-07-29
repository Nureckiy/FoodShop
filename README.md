# Hohotel
The project is a web application that allows to provide booking operations on the hotel. Besides, there are provide service to place order meals delivery to the room.

# Server development

To work with server it"s nessesary to install .Net Core SDK and mssql localdb.

On the first run execute "dotnet restore" command.

## Build application
Navigate to /Api/Hohotel repository and run "dotnet build -c release" command. Compiled files will creates on the /bin/Release folder.

## Run server
Run "dotnet run" command for the code project or run the Hohotel.dll file.

## Run unit tests
On the first run execute "dotnet restore" command.

Navigate to /Api/Hohotel.Tests repository and run "dotnet xunit" command.

# Client development

To work with client it"s nessesary to download and install node.js server. May be needed to install node-gyp package.

On the first run needed to execute "npm i" command.

## Build application
Run "npm build" command. Compiled project will be in the /dist folder

## Run application
Run "npm start" command.

## Run client on debug mode
Navigate to FoodShop.Ui repository, run npm start and open "http://localhost:3000" page.
