##### SBA 308: JavaScript Fundamentals #####

This is a project to grade leaner submissions using Javascript. The idea is to grade submissions by processing different data (course info, assignment group, learner submission) which are interconnected with each other.

# Technology Used:

Javascript

# Testing

I used the sample test data provided in the assignment for testing throughout my code creation. I also created few simple dataset, course info, assignment group, learner submission, just to test out that my code works for some edge cases like points_possible==0 and assignment's course id not matching the course id in course info and made sure that the result is formatted in the exact way requested in the assignment.

I have also created (and used during code creation) test points (log statement) at multiple places in the code, I have not removed them. They are commented at the time of submission and can be uncommented for future debugging and code check. These code checks looks something like:



////////////TESTING

//console.log('TESTING: assignment: ', assignment);

////////////



# Reflection

* What could you have done differently during the planning stages of your project to make the execution easier?

(1) At the start, I had difficulty visualising the interconnection of datasets (course info, assignment group, learner submission), which made it difficult for me to come up with a solid logic to solve the grading problem. I beleive this project was about understanding the interconnectedness of different dataset in great details. I created a simple text based interconnection information for example, id in course info <-->course_id in assignment info. But in retrospect, I should have created a visual model at the start, maybe a dbdiagram as was suggested by Dylan in class to make it easier. 


(2) I also started adding all of my logic in the main function (getLearnerData()) in a try catch block and i realize mid way that the code looks too messy and big. I then started using helper functions. 


(3) I also did not read the requirement section in the assignment doc properly. I should have started using helper function from the start.


* Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?

(1) We were asked to not use date function for our due date analysis. So, I had to figure out how to compare dates through strings. I used .split('-) function and come up with logic to compare months (in case year are same) and then dates (in case years and months are same).

(2) Creation of my learner information object gave me some issue. I had to figure out what information to add in my learner info object and how to retrive those details for my final formatted object (which goes into final result). I found some example on stackoverflow (object inside an object) of using objects as properties (value) inside my learner info object.



* What would you add to, or change about your application if given more time?

(1) Maybe I can make my lateOrOnTime() function more versatile by using time() function. or add error handling in this function to handle incorrectly formatted date information.

(2) I would figure out more test scenarios of bugs or where the code can fail and add more error handling for them.


* Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:

(1) Create a visual diagram of the problem (if possible) at the start, in order to come up with a solid logic to solve the problem.

(2) Use more helper function for reducing clutter and code reuse purpose

(3) Keep up with the 'testing logs code lines' that I created during the creation of the code. It helps to check that the code works or helps in debugging if something goes wrong.
