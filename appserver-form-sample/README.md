#Application Server form example

This example demonstrates how to use the Cloud CMS dust processor with form support.

To set this up, do the following:

1.  Create a new Forms Sample project

This project includes a sample content type "custom:registration".
It also has a data list with the key "registrations".

2.  Get the API keys and copy the gitana.json file into the same directory as this readme.

3.  Run the Cloud CMS application server locally

    cloudcms server
    
4.  Open up a browser:

    http://localhost:3000
    
## How it works

The index.html page uses the @form tag to render a form.  The form renders browser-side using the Alpaca form engine.

    {@form definition="custom:registration" form="master" list="registrations" success="/thankyou.html" error="/index.html"}{/form}
    
This instructs the web page to render a form.  The form is defined in Cloud CMS as:

    - definition `custom:registration`
    - form key `master`
    
When the form is submitted, records are written into the data list with key `registrations`.

Upon success, the user is redirected to `thankyou.html` and back to `index.html` when an error occurs.