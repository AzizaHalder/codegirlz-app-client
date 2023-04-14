# CodeGirlz

## Description

connecting female identifying coders
in person and online

## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start connecting or learning with the CodeGirlz community
- **Login:** As a user I can login to the platform to have access to Learn and Meetup
- **Logout:** As a user I can logout from the platform so no one else can use my account
- **Homepage:** As an anon I can view the homepage and browse meetups and resources
- **Add a Meetup** As a user I can add a meetup so that I can meet coderz in the community
- **Edit your own Meetup** As a user I can edit my meetup so that I can meet coderz in the community
- **View Meetup Details** As a user I can view a meetup details so that I can learn more
- **Attend a Meetup** As a user I can attend a meetup so that I can meet other coderz
- **List all Meetups** As an anon I can see general info about meetups and as a user I can interact with meetups and view users
- **Search Meetups** As a user I want to search meetups by name so that I can find likeminded coderz
- **View my Meetups** As a user I want to attend a meetup so that I can save the meetups that I want to go to
- **Add a Resource** As a user I can add a resource so that I can share it with the coderz community
- **Edit your own Resource** As a user I can edit my resources so that I can keep it up to date
- **View Resource Details** As a user I can view a resource detail so that I can learn more
- **Save a Resource** As a user I can save a resource so that I can read it again or share with others
- **Search Resources** As a user I want to search resources by name so that I can learn topics of interest
- **View Saved Resources** As a user I want to view my saved resources so that I can see only the resource of interest
- **View my Profile** As a user I want to view the information recruiters would see
- **Update my Profile** As a user I want to update my profile so that I can find jobs that suit my skills and location
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
- /resource - resource list
- /restaurants/create - create a restaurant
- /restaurants/:id - restaurant detail
- /profile/me - my details and favorite restaurants

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Restaurants List Page (public only)
- Restaurant Create (user only)
- Restaurant Detail Page (public only)
- My Profile Page (user only)
- 404 Page (public)

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

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Restaurant model

```
owner - ObjectID<User> // required
name - String // required
phone - String
address - String
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - restaurantId
- DELETE /user/me/favorite/:restaurantId
  - body: (empty)
- GET /restaurant
- POST /restaurant
  - body:
    - name
    - phone
    - address
- GET /restaurant/:id

## Links

### Miro

[Link to your Miro board](https://miro.com/app/board/uXjVMc7IG7U=/?share_link_id=474114558931) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/AzizaHalder/codegirlz-app-client)
[Server repository Link](https://github.com/AzizaHalder/codegirlz-app-server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
