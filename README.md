# Alexa-Skills-DriveTime:
  This repository is to demonstrate how to build ALEXA skill to help everyone to know the travel time taken to reach the destination from source in current traffic.
  
  You can find live skill @ https://alexa.amazon.in/spa/index.html#skills/dp/B07CWRYLX7/?ref=skill_dsk_skb_sr_0&qid=1526293036
  
# Brief demonstrating skill: 
  Currently as per one of the Survey, India spends more time in traffic than other populated countries. An individual spends around 5-12hrs on average per week in traffic (source: https://timesofindia.indiatimes.com/photo/46337807.cms ).

  If the individual comes to know what’s the current traffic between the locations he is supposed to travel in current traffic, he can plan his drive accordingly by knowing the travel time in traffic. Currently we have Google Map’s which can predict the time in current traffic, this skill is one of the substitute. As skill is driven by voice services, user can communicate with
ALEXA devices in the natural language and get the queries related to traffic is simple easier way.

  This will be more beneficial for every individual traveling every day in traffics. For example, the Employees/Business professionals who want to travel to office can check how much time it takes for him to reach office for attending meetings by asking ALEXA rather than opening his smart phones to check it internet. This might be very useful for elderly people as well as disabled who face issue in operating the smart phones to know about travel time before they start their journey.

![alt architecture](https://raw.githubusercontent.com/SuneetPatil/Alexa-Skills-DriveTime/master/architecture/architectureImg.jpg) 

# YouTube Link: 
  https://www.youtube.com/watch?v=pfMk8B4l-X4&t=9s 
  
# To use this code:
 1. Update src/index.js line 3 with your APP ID. Its available in Skill Information tab while submitting.
 2. Get the API Key from Google(https://developers.google.com/maps/documentation/directions/get-api-key) and update src/index.js line 166 with your directions api key.

# Sample Conversation:
 •	Please provide the start and end points by area, city and state/country to get the accurate response.
 
    User: Alexa, ask drive time to know my Travel time.
    Alexa: {Greetings} + I can help you to plan your drive. Please say your starting point
    User: Vijaynagar Bangalore
    Alexa: Please say your ending point
    User: Whitefield Bangalore
    Alexa: Fastest route, despite heavy traffic than usual between Vijaynagar Bangalore and Whitefield Bangalore via HAL Old Airport Rd which is 27.9 km. But due to traffic you will reach in 1 hour 23 mins
  
# Future Scope:
  1. Can add destination navigation support from source.
  2. Can store user frequent addresses like home, office, gym etc specific for the user instead of user telling complete address. This helps in providing exact time between the destination.
  3. Currently Skill support for present traffic timings i.e. now. We can add feature for user to check for traffic in the route for any user specified timings.
 4. Currently we are showing best route, distance and time in traffic. We can even show alternative routes for user to select.
 5. Can integrate with user calendar and provide reminders along with suggesting best time to start journey by checking traffic jams with best routes.
