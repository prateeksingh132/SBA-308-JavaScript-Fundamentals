console.log("\n");
console.log("////////////// SBA 308: JavaScript Fundamentals ////////////// ")
console.log("\n");


////////////////////////Thing to keep in mind (from dylan):
// Relationships between objects
//     Reread, reread, reread the prompt
//     Create Data Model relationship diagram
// Break down the problem into plain language steps before starting
// You DO NOT NEED TO USE Date() class - date is given as a string (turn it into an array for easy comparison).
//     Use current year as current date
// Try Catch used around the main logic
// Main function was already created for you, so use it
// The whole logic revolves around 1 main loop!!!!!
// Refer to the expected output.

//////////////////////////////////////////////

// The provided course information.



const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

/////////////////////////////////////////////////////////////////////////////////
///////////////////// Helper Function
////////////////////

//// this functon checks if the assignment group doesnt belog to the course
function assignmentInCourseCheck(course, ag) {
  if (ag.course_id !== course.id) {
    return false;
  }
  return true;
}

/// this function gets the assignment details from AssignmentGroup using id, which is assignments object inside assignments array inside AssignmentGroup object
function assignmentInfo(ag, assignmentId) {
  // looping through the assignments array inside ag
  for (let i = 0; i < ag.assignments.length; i++) {
    if (ag.assignments[i].id === assignmentId) { // found the matching assignment
      return ag.assignments[i];
    }
  }
  return null; // returning null if not found
}

/// this function checks the late submission
function lateOrOnTime(submittedDate, dueDate) {

  // i am gonna split the date string by "-" to get [year, month, day]
  let submittedArray = submittedDate.split("-");
  let dueArray = dueDate.split("-");

  // step 1: compare years. 
  // if years are equal, make sure you go to the next if statement. so dont use any else or else if here.
  // using parseInt to convert string to number for comparison
  if (parseInt(submittedArray[0]) > parseInt(dueArray[0])) {
    return true; // it is late (year is greater)
  }
  if (parseInt(submittedArray[0]) < parseInt(dueArray[0])) {
    return false; // it is early (year is smaller)
  }

  // step 2: compare months (if years are same). 
  // Goal: i should only reach to this point if the years are equal. 
  // if months are equal too, again we need to make sure we can go to the next if statement. so dont use any else or else if here.
  if (parseInt(submittedArray[1]) > parseInt(dueArray[1])) {
    return true; // late
  }
  if (parseInt(submittedArray[1]) < parseInt(dueArray[1])) {
    return false; // early
  }

  // step 3: compare days (if months and years are same)
  // Goal: i should only reach to this point if the years as well as months are equal. 
  if (parseInt(submittedArray[2]) > parseInt(dueArray[2])) {
    return true; // late
  }

  return false; // strictly on time or early

}



/////////////////////////////////////////////////////////////////////////////////
///////////////////// Main Function
////////////////////

//////////////////// WHAT I KNOW: 
///// this is basically a project to GRADE submissions. there are assignment info, due dates, submission date etc. i have to grade based on these info.
///// I have 2 main OBJECTS; CourseInfo, AssignmentGroup, and 2 main ARRAY of objects; assignments, LearnerSubmissions.
//// getLearnerData() is the entry point for this project. Thats where all of my logic code goes in.
//////// I have to first establish relationship between the different objects and its properties:
/// 1. CourseInfo (id) links to AssignmentGroup (course_id). This has to be my first check. if the assignment group doesnt belog to the course, i should throw an error.
/// 2. LearnerSubmission has assignmet_id, this must match the assignment in assignmentGroup array. and I can get the points_possible and due_at data to grade.
/// 3. Note: assignments given are in the form of array inside AssignmentGroup. submission is an object inside LearnerSubmission
/// 4. Note: So it means, that i will need to access properties like learner.submission.score..... or something similar.
/// 5. score: the score given to the learner is inside submission object which itelf is inside LearnerSubmission. total points is inside assignment array which itself is inside assignmentGroup object.
/// 6. which means to get the avg, i will need to do something linke this: submission.score/assignments.point_possible
/// 7. So, the MAIN LOOP that we talked about in class, has to be looping through LearnerSubmissions. Idea is to get the assignment_id (and match with assignments in assignmentGroup) and learner submission result (submitted_at and score)
/// 8. we were also asked to not use date() function. so i can just do .split("-") and get the year, month, date in string array format. and i can compare the year with current year (which i can hardcode as a string "2025"). if due_at(the year)>current_date(2025), dont get this data.
/// 9. Error handling: i have to do some basic error handling: like points_possible==0 or courseid!=courseinfo id etc.
/// 10. Result format: so, i have to create an array of object called result. the object here are the learner student information (id, avg, 1 (avg of assgn 1), 2(avg of assgn 2)) 


///////// LOGIC: how to proceed, step by step:
// inside getLearnerData, first, start with try/catch and do  the main check: CourseInfo (id) == AssignmentGroup (course_id). if not, ERROR. maybe use a helper function
// initialise a leaner object which will store data for each student. i ll need 3 data (as per assignment), id, score, points_possible to do the calculations.
//////// Start MAIN LOOP: 
// i have to iterate through learnerSubmissions ('submissions' inside getLearnerData()), loop for each submission. Goal: get this learner object with data
// for each submission: get assignment details by using id, from assignmentGroup, add logic for this. i will need to iterate through 'ag', so another loop. or maybe use another helper function to do this work.
// check 1: after this, put another try/catch here for points_possible==0.
// check 2: check if the assignment is due yet. Dylan said to turn the date into array, so use .split("-") and compare the year string. if due>current year, dont take that data
// if its late: change score, score-10. if not, keep the score. 
// Now, by this time i will have 3 data, id, score, point_possible. add these 3 data into lerner object. so, i will have lerner objects with corresponding data that i will need to process next.
/////// main loop should stop here
////// data procesing:
// i have to iterate now through my learners object, and get indivual data, like do the calculations. i will decide how to do this once i reach this point. do test till here.




function getLearnerData(course, ag, submissions) {

  const result = [];

  try {

    // all logic goes here

    // step 1: ERROR HANDLING 1: CHECK: validating the course id in course and assignment object
    console.log("Checking if course IDs match...");
    if (!assignmentInCourseCheck(course, ag)) {
      throw new Error(`Invalid Input: Assignment Group ${ag.id} does not belong to Course ${course.id}`);
    } else {
      console.log(`1st check complete, Assignment Group ${ag.id} belongs to Course with id ${course.id}. Proceeding...`);
      console.log("\n");
    }

    // step 2: start the main loop
    console.log("Starting Main Loop...iterating through 'submissions'.");

    // I am creating a temporary object to hold data for each learner as I loop
    // Found an example on stackoverflow to use object as value inside an object, use this for future debugging: https://stackoverflow.com/questions/6429959/objects-inside-objects-in-javascript 
    // Goal: our lerner data should look something like this at the end of the loop: { learner_id: { id: 125, totalScore: 0, totalPossible: 0, 1: 0, ... } }
    let learnerInfo = {};

    for (let i = 0; i < submissions.length; i++) { /// iterating through each submission (LearnerSubmissions array)

      let eachSubmission = submissions[i];
      let learnerId = eachSubmission.learner_id;
      let assignmentId = eachSubmission.assignment_id;
      ///TESTING
      // console.log('TESTING: eachSubmission: ', eachSubmission);
      // console.log('TESTING: learnerId: ', learnerId);
      // console.log('TESTING: assignmentId: ', assignmentId);

      // get the assignment details from AssignmentGroup, which is assignments object inside assignments array inside AssignmentGroup object: use helper function and feed it with AssignmentGroup and assignmentId
      let assignment = assignmentInfo(ag, assignmentId);
      ///TESTING
      //console.log('TESTING: assignment: ', assignment);


      // step3: ERROR HANDLING 2: CHECK: check if you can find the assignment using id. if we get null from helper function, throw error
      if (!assignment) { // if we get null from assignmentInfo() helper function, which means we didnt find the assignment, such assignment doesnt exist, hence throw error
        console.log(`Assignment ID ${assignmentId} not found. Skipping.`);
        // CHANGE: change made here, i realise if i throw error here, it stops moving to other assignment and stops the project, which we dont want. so i am gonna use continue.
        continue;
      }

      // step4: ERROR HANDLING 3: error handling for points_possible == 0
      // I cant divide by zero later, so I need to check this now
      if (assignment.points_possible == 0) {
        throw new Error(`Invalid points_possible: Assignment ${assignment.id} has 0 points possible, which is INVALID.`);
      }

      // step 5: check if assignment is due yet
      // using the split technique again to get the year. Assignment 3 is year 3156. make sure this data is skipped in the final result.
      let dueYear = parseInt(assignment.due_at.split("-")[0]);
      let currentYear = 2025; // Dylan asked to use current year as this year 2025 in the class

      if (dueYear > currentYear) {
        // console.log("Assignment is not due yet. Skipping...");
        continue; // skip this iteration of the loop
      }

      // step 6: initialise learner object if it doesn't exist in my temporary learnerInfo
      // see this link for future debugging how they created and used the object as value of an object: https://stackoverflow.com/questions/69767220/how-to-insert-object-inside-an-object-in-javascript
      if (!learnerInfo[learnerId]) {
        learnerInfo[learnerId] = {
          id: learnerId,
          totalScore: 0,
          totalPossible: 0
        };
      }

      ///TESTING
      // console.log('TESTING: learnerInfo: ', learnerInfo);

      // step 7: check for LATE submission and calculate score
      // i will use my helper function lateOrOnTime() here
      let score = eachSubmission.submission.score;
      let possible = assignment.points_possible;

      if (lateOrOnTime(eachSubmission.submission.submitted_at, assignment.due_at)) {
        console.log(`Learner ${learnerId} submitted Assignment ${assignment.id} LATE.`);
        // deduct 10% of total points possible
        let penalty = possible * 0.10;
        score = score - penalty;
        ///TESTING
        // console.log('TESTING: score: ', score);
        // console.log(`New score after penalty: ${score}`);
      }

      // step 8: update the learner's totals in my learnerInfo object
      learnerInfo[learnerId].totalScore += score;
      learnerInfo[learnerId].totalPossible += possible;

      ///TESTING
      // console.log('TESTING: learnerInfo: ', learnerInfo);

      // step 9: Calculate individual assignment percentage and store it
      // format should be key: assignment_id, value: percentage
      let percentage = score / possible;
      learnerInfo[learnerId][assignment.id] = percentage;

      ///TESTING
      // console.log('TESTING: learnerInfo: ', learnerInfo);

      ///// TESTING
      console.log('TESTING: learnerInfo : ', learnerInfo);
    } 
    
    ////////// main loop ends













  } catch (error) {
    console.log("ERROR: ", error.message);
  }















  // // here, we would process this data to achieve the desired result.
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  // final result as is asked in the assignment
  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);


