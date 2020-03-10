// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(datarow => {
    //****************************************************/
    // DataRow is received from server in unsorted form
    // It is sorted ascending
    //****************************************************/
    let datasorted=datarow.sort((a,b)=>{
        let dateA=new Date(a.day), dateB=new Date(b.day);
        return dateA-dateB;
      });
    //****************************************************/
    // Now, we will pick the top 7 elements to be displayed
    // all other data will be discarded
    //****************************************************/
    let data=[];
    if (datasorted.length<=7){
      data=datasorted;
    } else {
      data=datasorted.slice(datasorted.length-7,datasorted.length);
    }
    //**********************************/
    //  Now we will populate the data  */
    //**********************************/
    populateChart(data);
  });

API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let labels = label(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

//*********************************************************************/
//  Following function has been modified so that only one array       */
//  is returned for each workout.  It adds all of the durations for   */
//  all of the exercises in the workout and returns it                */
//*********************************************************************/
function duration(data) {
  let durations = [];
  let total_duration=0;

  data.forEach(workout => {
    total_duration=0;   // sets total duration to zero for each workout
    workout.exercises.forEach(exercise => {
        total_duration=total_duration+exercise.duration;
    });
    durations.push(total_duration);
  });

  return durations;
}

//*********************************************************************/
//  Following function has been modified so that only one array       */
//  is returned for each workout.  It adds all of the weights for     */
//  all of the exercises in the workout and returns it                */
//*********************************************************************/
function calculateTotalWeight(data) {
  let total = [];
  let total_weight=0;

  data.forEach(workout => {
    total_weight=0;   // Initializes weight to zero for each workout
    workout.exercises.forEach(exercise => {
      total_weight=total_weight+exercise.weight;   // adds all of the weights from all of the workout exercises
    });
    total.push(total_weight);  // pushes only 1 record for each workout
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}

//***************************************************/
//  the following function will populate the labels
// using the date obtained from the data
//***************************************************/
function label(data) {
  let labels = [];

  data.forEach(workout => {
    labels.push(moment(workout.day).format('MM-DD-YY'));
  });
  return labels;
}
