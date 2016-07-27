# Cloud CMS SDK - Java2

Maven build test application. Connects to Cloud CMS, creates and then queries for nodes against a content repository branch

Create an "application" object on your Cloud CMS project and copy the gitana properties to src/main/resources/gitana.properties

Set the name of your project's content repository on line #10 of src/main/java/TestGitana.java

the content repository name is generally the name of your project appended with " 'content' repository".
for example if your project is named "My Test Proj" then your repository name will be "My Test Proj 'content' repository

You can verify your repository name in the admin console.

Run the code:
  mvn clean test
