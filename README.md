# Matthias Djernæs Dat20c - 21/12/2021 - Studienr. 4113

# Start up
When you start the program a test user is created automatically:

Username: John
Password: Doe

Alternatively you are welcome to create your own user using the frontend.

# Database
You'll need to change settings in application.properties to fit your DB.
DB is then initialized and populated with dummy data. When the DB is created you should change 
spring.jpa.hibernate.ddl-auto"=create-drop" to "=update" if you want your data stored

To see the functionality with overview for party scores you'll need to change: 

root, password and URL in DatabaseConnection under the @Value tag. I have left some random credidentials as an example

#Navigation
There is no controller to avoid rendering through Thymeleaf. Instead navigation is done by JavaScript.