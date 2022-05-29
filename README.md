<font size="+2"><b>

### SHERLOCK HOMIE</b></font><br>
<font size="-1">One Stop Security Solution</font>

[![Maintenance](https://img.shields.io/badge/Made_with-❤️-pink.svg)](https://www.youtube.com/watch?v=o8-nBIyFqaM)


<font size="-1">

  ## Topics covered:
- [Introduction](#introduction)<br>
- [Architecture](#architecture)<br>
- [Functionalities](#functionalities)<br>
- [Installation and setup](#installation-and-setup)<br>
- [Sample Test Data](#sample-test-data)<br>
- [Built With](#built-with)<br>
- [Useful Links](#useful-links)<br>
- [Folder Organization](#folder-organization)<br>
- [Future Enhancements](#future-enhancements)<br>
- [Contact](#contact)
  
## Introduction

The constant evolution in the virtual world and emerging new technologies made things way more accessible that includes coming up with an effective solution for our security needs.

<p align="center">
  <img src="https://i.ibb.co/jG0DMs0/HOme.jpg" />
</p>

## Architecture

<p align="center">
  <img src="https://i.ibb.co/j8cFCmS/Sherlock-Homie-1.png" />
</p>

## Functionalities

#### Recognition

- Scanning and identification of suspects

<p align="center">
  <img width="170" src="https://i.ibb.co/G2pfwqp/Whats-App-Image-2022-05-29-at-11-51-08-AM.jpg" />
</p>

<font size="-1">
  
- [x] Suspects can be identified from the trained data by scanning their faces
- [x] Personal and Identification details of the suspects are displayed which can be used for cross checking.
- [x] Report option to report The identified suspects to the database along with their details, which are to be displayed on the map
- [x] Suspect details can be shared via any social media platform by clicking on the share button
- [x] A link is provided which on clicking would redirect to the charge sheet where additional details of the suspects can be viewed

</font>

#### Add face data

- AdminScreen which is made visible only for the admin.
<p align="center">
  <img src="https://i.ibb.co/28q3hBL/image-2022-05-29-134502469.png" />
</p>

<font size="-1">
  
- On clicking the add faces button, details of criminals can be added along with their images into the database.
- The train faces option allows us to submit the data for training to the Azure portal.</font>

#### Login & Profile

<p align="center">
  <img  width ="170"  src="https://i.ibb.co/Ln34KF6/login.jpg" />
</p>

<font size="-1">
  
- A logged in user can either be a general user or Admin
- Only admin is permitted to add and train criminal data as shown.</font>

#### Contacts

<font size="-1">
  
- Contacts Screen where list of emergency contacts are displayed for easy access and tool tips are available on each screen
</font>

#### Statistics

<font size="-1">
  
- Collective geographic statistics, that is the number of suspects identified on a various locations are displayed via google maps as markers.

<p align="center">
  <img width ="170" src="https://i.ibb.co/FBsKqhS/map.jpg" />
</p>

- On clicking a particular location marker, details of the criminals identified on that location are displayed
  </font>

## Installation and setup
  
  
  <b>Prerequisites:</b>
  - [React native setup](https://reactnative.dev/docs/environment-setup)
  - [VS Code](https://code.visualstudio.com/docs/setup/windows) or any editor

1. For cloning the project into the local machine

```
git clone https://github.com/devSoz/Sherlock_Homie.git
```

2. At the root of the project, run the following command

```
npm install
```

3. Connect the device through USB

```
npx react-native run-android
```

Or APK file can be installed from [here](https://drive.google.com/file/d/17mhqPSkfN8cCZfnnzUZkLK4FnZR2i542/view?usp=sharing)

## Sample Test Data
  
NOTE: Login credentials have been shared in the submission form<br><br>
Any of these images can be used for testing by scanning on pressing the 'Detect faces' button in the Detect tab of the application
[Vijay Mallaya](https://i.ibb.co/2F5tspM/vijay-mallay.jpg), [Sandra Avila Beltran](https://i.ibb.co/4ZKSmh7/sandra.jpg), [Saddam Hussein](https://i.ibb.co/Vp5V735/saddam.jpg), [Nirav Modi](https://i.ibb.co/QX8XdgN/nirav.jpg), [Hafiz Saeed](https://i.ibb.co/qR1V8w3/hafiz.jpg), [Bhadreshkumar Patel](https://i.ibb.co/4wkgXTx/badresh.jpg)
  
## Built With

<p align="left"> <a href="https://developer.android.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg" alt="android" width="40" height="40"/> </a> <a href="https://azure.microsoft.com/en-in/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" alt="azure" width="40" height="40"/> </a> <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> </p>

## Useful Links

- [APK link](https://drive.google.com/file/d/17mhqPSkfN8cCZfnnzUZkLK4FnZR2i542/view?usp=sharing)
- [Demo Video](https://www.youtube.com/watch?v=o8-nBIyFqaM)
- [Power point presentation](https://docs.google.com/presentation/d/1TQCPvJJGA4xI1ibhZkUT3lyyV9iD4txr/edit?usp=sharing&ouid=107510663828966773985&rtpof=true&sd=true)
  
   
## Folder Organization

   <pre>
    |-- src
    |   |-- Backend                              #Backend Routes
    |   |   |-- index.py                         #Python file containing all routes that connect to MySQL database
    |   |   |-- Procfile            
    |   |   |-- requirements.txt                 #Dependencies required for deployment
    |   |-- Components                           #Reusable components
    |   |   |-- Button.js                        #Button JSX components
    |   |   |-- ErrorMessage.js                  #JSX to display custom error messages
    |   |   |-- Header.js                        #Header component (To show title and tooltip)
    |   |   |-- HeaderBack.js                    #Header component (To show title, tooltip, back button)
    |   |   |-- Line.js
    |   |   |-- LottieFiles                      #Animation Lottie file componenents
    |   |       |-- LoadingScreen.js
    |   |       |-- LoadLottie.js
    |   |       |-- StartingPage.js
    |   |-- Lib                                  #Library component that handles API calls
    |   |   |-- Requestor.js
    |   |-- Mobx                                 #MobX state management system
    |   |   |-- ADD_FACES_STORE.js
    |   |   |-- CONTACT_STORE.js
    |   |   |-- FACE_STORE.js
    |   |   |-- SUSPECT_STORE.js
    |   |   |-- USER_STORE.js
    |   |-- Navigation                           #Stack navigator to navigate between screens
    |   |   |-- AdminNavigator.js                #Navigator for Add Faces and Train 
    |   |   |-- index.js                         #Navigator for Splash, Login and Home Screen
    |   |   |-- ReportNavigator.js               #Navigator for Map display and list of suspects
    |   |-- res                        
    |   |   |-- Images                           #Images used in the application
    |   |   |   |-- Adddata.jpg
    |   |   |   |-- mapointer.jpg
    |   |   |   |-- person.png
    |   |   |   |-- Traindata.jpg
    |   |   |-- Lottie                           #Lottie files
    |   |       |-- DetectLoading.json
    |   |       |-- loading.json
    |   |       |-- login.json
    |   |       |-- SplashLottie.json
    |   |       |-- Starting_RecognitionPage.json
    |   |       |-- text.json
    |   |-- Screens                              #Screen folders containing UI, API calls 
    |   |   |-- Admin                            
    |   |   |   |-- Admin.js                     #Options for Admin to Add face or Train data    
    |   |   |-- FaceRecognition                  
    |   |   |   |-- index.js                     #SimilarFaces and floating button are rendered as a components
    |   |   |   |-- Report.js                    #Calls API to store identified suspect to the database
    |   |   |   |-- SimilarFaces.js              #Scans faces and calls SimilarFacesAPI and renders res
    |   |   |   |-- SimilarFacesAPI.js           #API call to detect and identify faces and fetch details
    |   |   |-- Face_Collection
    |   |   |   |-- index.js                     #Add face data
    |   |   |-- HomeScreen                       
    |   |   |   |-- index.js                     #Tab navigation of Screens
    |   |   |-- LoginScreen
    |   |   |   |-- index.js                     #Login UI and calls LoginAPI.js 
    |   |   |   |-- loginAPI.js                  #Calls loginAPI route and stores the user data in USER_STORE and async_storage
    |   |   |-- ReportScreen                  
    |   |   |   |-- index.js                     #Calls ReportSummaryAPI and displays statistics
    |   |   |   |-- ReportDetail.js              #Calls ReportDetailAPI and shows the list of identified suspects
    |   |   |   |-- ReportDetailAPI.js           #Requests data through API route
    |   |   |   |-- ReportSummaryAPI.js          #Requests Location summary data
    |   |   |-- SettingsScreen
    |   |   |   |-- Contacts.js                  #Displays list of contacts
    |   |   |   |-- ContactsApi.js               #Fetches contacts information
    |   |   |   |-- Profile.js                   #User Profile
    |   |   |-- SplashScreen
    |   |   |   |-- index.js                     #Splash Screen
    |   |   |-- Train
    |   |       |-- TrainAPI.js                  #API call to train data
    |   |-- Utils                                
    |       |-- color.js                         #Consists of Constants for Colors, theme
    |       |-- Constants.js                     #API constants for base urls and endpoints
    |       |-- help.js                          #Contains tooltip instructions
    |       |-- PickerList.js                    #Reusable PickerList
    |       |-- StorageKeys.js                   #Storage Keys for async storage
    |       |-- UIConstants.js                   #UI constants for styling
    |       |-- Util.js                          #Reusable utility functions

</pre>
  
## Future Enhancements

- [ ] Report to the respective authorities when a suspect is identified through an automated push notification or a voice call
- [ ] Slicing and dicing of suspect data to produce various analytical reports
- [ ] Improving accuracy of face recognition by Keeping track of the confidence level
- [ ] Suspect details can be shared via any social media platform by clicking on the share button
- [ ] Customization of the app for similar use cases such as missing person/pet etc.

## Contact

Feel free to contact me on [LinkedIn](https://www.linkedin.com/in/devipriya-sozharajan-a8b0b5210/)

</font>
