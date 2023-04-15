# CodeGirlz

## Description

connecting female identifying coders
in person and online

## User Stories

- **Homepage:** As an anon I can view the homepage and browse meetups and resources
- **List all Meetups** As an anon I can see general info about meetups and as a user I can interact with meetups and view users
- **Signup:** As an anon I can sign up in the platform so that I can start connecting or learning with the CodeGirlz community
- **Login:** As a user I can login to the platform to have access to Learn and Meetup
- **Search Meetups** As a user I want to search meetups by name so that I can find likeminded coderz
- **View Meetup Details** As a user I can view a meetup details so that I can learn more
- **Add a Meetup** As a user I can add a meetup so that I can meet coderz in the community
- **Edit your own Meetup** As a user I can edit my meetup so that I can meet coderz in the community
- **Attend a Meetup** As a user I can attend a meetup so that I can meet other coderz
- **View my Meetups** As a user I want to attend a meetup so that I can save the meetups that I want to go to -**List Resources** As a user I want to see general info about all the resources available and as a user I can view resources
- **Search Resources** As a user I want to search resources by name so that I can learn topics of interest
- **View Resource Details** As a user I can view a resource detail so that I can learn more -**Comment on a Resource** As a user I can leave a comment on the Resource Details page
- **Add a Resource** As a user I can add a resource so that I can share it with the coderz community
- **Edit your own Resource** As a user I can edit my resources so that I can keep it up to date
- **Save a Resource** As a user I can save a resource so that I can read it again or share with others
- **View Saved Resources** As a user I want to view my saved resources so that I can see only the resource of interest
- **View my Profile** As a user I want to view the information recruiters would see
- **Update my Profile** As a user I want to update my profile so that I can find jobs that suit my skills and location
- **Logout:** As a user I can logout from the platform so no one else can use my account
- **Recruiter Signup** As a recruiter I can sign up in the platform so that I can hire coderz
- **Recruiter Login** As a recruiter I can login to the platform to have access to coderz to hire
- **Recruiters view Job Candidates** As a recruiter I can view coderz profiles who are open to new opportunities

## Backlog

User profile:

- chat with recruiters of companies
- chat with other users

Recruiter profile:

- chat with job candidates that meet requirements

Geo Location:

- see candidates and other users in a map

# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /meetup - meetup list
- /meetup/:id - meetup details
- /meetup/attend - saved meetups
- /meetup/edit/:id - meetup details
- /meetup/attend - saved meetups
- /resource - resource list
- /resource/create - create a resource
- /resource/save - saved meetups
- /resource/:id - resource details details
- /resource/edit/:id - saved meetups
- /profile/:id - profile page
- /restaurants/:id/edit - edit profile page
- /profile/me - my details and favorite restaurants
- /profile/:id - profile page
- /profile/:id/edit - edit profile page
- /auth/recruiter/signup - recruiter signup form
- /auth/recruiter/login - recruiter login form
- /recruiter/job-candidates - view users open to job opportunities

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Meetups List Page (public)
- Meetups Create (user only)
- Meetups Edit (user only)
- Meetups Details (user only)
- My Meetups (user only)
- Resource List Page (public)
- Resource Create (user only)
- Resource Edit (user only)
- Resource Details (user only)
- Resource Saved (user only)
- Profile (user only)
- Profile Edit (user only)
- Recruiter Sign In Page (anon only)
- Recruiter Log In Page (anon only)
- Job Candidates List Page (recruiter only)

## Components

- GooglePlaces component
  - Input: location name
  - Output: address(currentLocation: string)
- Search component
  - Output: change(terms: string)
- Add Meetup
- Add Resource
- Footer
- IsAnon
- isPrivate

## IO

## Services

- Meetup Service
  - getAllMeetup()
  - uploadEventImage(file)
  - createMeetup(newMeetup)
- Resource Service
  - getAllResource()
  - uploadResourceImage(file)
  - createResource(newResource)
- User Service
  - getUserInfo(profileId)

# Server

## Models

User model

```
name - String // required
email - String // required & unique
password - String // required
currentLocation - String
city - String
level - String
linkedin - String
github - String
newOpp - Boolean // required
eventsAttended - [ObjectID<Meetup>]
myResource - [ObjectID<Resource>]
profileImg - String
description - String
```

Recruiter model

```
recruiterName - String // required
email - String // required & unique
password - String // required
company - String // required
city - String
linkedin - String
createEvent - [ObjectID<Meetup>]
jobCandidates - [ObjectID<User>]
```

Resource model

```
resourceTitle - String // required
resourceImage - String
resourceURL - String
resourceContent - String
resourceType - String // required
videoUpload - String
podcastUpload - String
author - [ObjectID<User>]
comments - [ObjectID<Comment>]
```

Meetup model

```
eventName - String // required
eventType - String // required
eventCountry - String
eventCity - String
eventAddress - String
eventLink - String
eventDescription - String // required
eventImage - String
eventDateAndTime - String // required
attendees - [ObjectID<User>]
author - [ObjectID<User>]
```

Comments model

```
commment - String // required
resource - [ObjectID<Resource>]
author - [ObjectID<User>]
```

```

## API Endpoints/Backend Routes

- GET /auth/verify
- POST /auth/signup
  - body:
    - name
    - email
    - password
    - level
    - newOpp
    - city
    - currentLocation
    - profileImg
    - linkedin
    - github
    - description
- POST /auth/login
  - body:
    - email
    - password
- GET /auth/recruiter/verify
- POST /auth/recruiter/signup
  - body:
    - recruiterName
    - email
    - password
    - company
    - city
    - linkedin
- POST /auth/recruiter/login
  - body:
    - email
    - password
- POST /resource/:resourceId/comment
  - body:
    - comment
    - user
- GET /resource/:resourceId/comment-list
- DELETE /resource/:resourceId/comment/:commentId
- GET /meetup
- POST /meetup/upload
- POST /meetup/create
  - body:
    - eventName
    - eventType
    - eventCountry
    - eventCity
    - eventAddress
    - eventLink
    - eventDescription
    - eventImage
    - eventDateAndTime
    - attendees
    - author
- GET /meetup/attend
- GET /meetup/:meetupId
- PUT /meetup/edit/:meetupId
- DELETE /meetup/edit/:meetupId
- POST /meetup/:meetupId/attend
- GET /profile/:profileId
- PUT /profile/:profileId/edit
- DELETE /profile/:profileId/edit
- GET /recruiter/job-candidates
- PUT /recruiter/edit/:recruiterId
- DELETE /recruiter/edit/:recruiterId
- POST recruiter/recruiterId/job-opportunities
- GET recruiter/recruiterId

## Links

### Miro

[Link to your Miro board](https://miro.com/app/board/uXjVMc7IG7U=/?share_link_id=474114558931) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/AzizaHalder/codegirlz-app-client)
[Server repository Link](https://github.com/AzizaHalder/codegirlz-app-server)

[Deploy Link](https://codegirlz-connect.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1zEzg7GA3qTNmxABsr4Yco76yuSyg5uHqtYvLNP_6AmQ/edit?usp=sharing)
```
