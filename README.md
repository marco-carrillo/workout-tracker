# Purpose of the application

The client-side has been provided, so that we can create the server side functionality to make this application work.

Even then, we have made modifications to the client side to make it work.

Overall, this is a workout tracker that keeps track of all of the workouts.  Each workout can have multiple exercises.  Each exercise can either be cardio or resistence.

Cardio exercises require the user to enter the name of the exercise, distance in miles and durations in minutes.

Resistance exercises require the user to enter the name of the exercise, the weight in pounds, the number of sets, the number of repetitions, and the duration in minutes.


## Access and client application behavior

Application has been deployed to https://xxxx.

When the client application starts, it will request the server for the last workout via the api GET "/api/workouts".  Once it starts, it will display that information together with the number of exercises for that last workout, and the aggregation of total weights lifted, total sets performed, total reps performed, and total distance covered.

The user has the ability then to add more exercises to the workout via the "Continue Workout" button , or to create a new workout.

##  Continue Workout 

The continue workout option allows the user to continue adding new exercises to the workout.

User enters the information about the new exercise, and then, the client requests the server to update the current document and add a new exercise to the array embeded in the current document of the workout collection.  

It does so by calling the PUT "api/workouts" route.

##  Create New Workout

The create new workout consists of two different actions:  1) Create an empty (no exercises) workout, and 2) add exercises to the workout.

Inmediately upon choosing this option, the client will ask the server to create a new document in our workout collection via the POST "api/workouts" route.

Then, it will ask the user to enter the exercise information, after which, it will ask the server to add the exercise to the workout via the PUT "api/workouts" route.

## Fitness Tracker Workout Dashboard

This workout has been modified from its original given how odd its original behavior.  It has been modified to provide the user with the statistics of the last seven workouts that have at least one exercise.  Any workout without any exercise will be ignored.

If a user enters multiple workouts per day, it won't aggregate them.  If will display them separately.

For users that skipped workouts during the days, the application will provide the last seven, regardless of how long ago it was.

If there are fewer than sever workouts, it will display only the number of workouts available.

For each workout, it will chart the total duration of all the individual exercises for that particular workout.

Additionally, it will chart the total pounds lifted by all of the individual exercises for that particular workout.

Each workout will be identified by the date it was entered.

##  Server APIs

There are four servers APIs that will use Mongoose to manage the Mongo NOSQL database.

1.  HTPP GET "/api/workouts/range":  Whenever this API route is called, it will retrieve the 7 most recent workouts that have at least one exercise.  Whenever the user asks to create a new workout the system will create an empty workout (no exercises).  It is up to the user to actually enter the exercises data.  Any time the user creates a workout but don't enter any exercise, the API will ignore them when returning the most recent seven workouts.

2.  HTTP GET "/api/workouts/":  This API is called by the client so that it can find which is the most recent workout.  We will return only one, the most recent one.  Even if we return more than one, the client will always use the most recent one.  However, we don't want to unnecessarily send all of the collection so that the client can only use the most recent one.  That would add to latency when the database grows

3.  HTTP POST "/api/workouts/":  This API will create a new workout.  Whenever the user requests to create a new record, it will create one.  Later, the user should add exercises to the workout.

4.  HTTP PUT "/api/workouts/:id":  This API will provide a workout id, and the data to add an exercise to the workout.  The exercise is an array embedded into a workout, so whenever this API is called, the server will push an additional array member into the workout.

##  Overall application demonstration

![GIF of input](./workout-demo.gif)
