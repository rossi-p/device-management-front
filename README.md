# device-management-back

The server is up and running on 
http://device-management-front-eldorado.s3-website-sa-east-1.amazonaws.com
Deployed on an S3 bucket, configured as a static website hosting. 
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple device management. We can manage devices and it's categories. This is the frontend of the aplication.
	
## Technologies
Project is created with:
* angular: 12.2.12
* bootstrap: 4.6
* ng-toaster: 14.1.4
* material-design-icons: 3.0.1
* typescript: 4.3.5

More info can be found in package.json file.
	
## Setup
To run this project, install it locally using npm after cloning the repo:

```
$ cd ../project-folder
$ npm install
```
Then you must change the API url to the your API:
```
$ cd app/services
```
Change the url for both services, devices and categories.

And finally, you can run:

```
$ ng serve --open
```
