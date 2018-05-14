# Alexa-Skills-DriveTime:
  This repository is to demonstrate how to build ALEXA skill to help everyone to know the travel time taken to reach the destination from source in current traffic.
  
  You can find live skill @ [Alexa Store Link](https://alexa.amazon.in/spa/index.html#skills/dp/B07CWRYLX7/?ref=skill_dsk_skb_sr_0&qid=1526293036)
  
# Brief Demonstrating Skill: 
  **Demo Video:** [YouTube Link](https://www.youtube.com/watch?v=pfMk8B4l-X4&t=9s)
    
As per a recent survey, citizens in India spend more time in traffic than other populated countries, which has a direct impact on their daily lives leading to stress and productivity-related issues. Alarmingly, an individual spends 5 to 12 hours on an average per week in traffic ([source link](https://timesofindia.indiatimes.com/photo/46337807.cms)).

There is a constant need for more efficient navigational aids with intelligent traffic alert systems that will help determine the traffic situation dynamically between different travel locations and assist in advanced planning and preparedness. While the navigational apps that exist today help predict traffic times, voice responses and interactions are mostly unidirectional.

Introducing DriveTime, a conversational user-interface driven by voice wherein the user can communicate with ALEXA devices in the natural language and seek queries related to traffic in a swift and efficient manner. We are confident this will have tremendous applicability amongst users who will be able to identify with the underlying objective and benefit from using this service.

Few sample use cases include employees or business professionals who drive to work can quickly interact with ALEXA and determine the travel time to help plan their meetings more efficiently. They need not browse the Internet or check other apps via their smartphones. Further, the elderly and the differently abled will benefit tremendously as it will be easier for them to interact with ALEXA than operating their smartphones.

![alt architecture](https://raw.githubusercontent.com/SuneetPatil/Alexa-Skills-DriveTime/master/architecture/architectureImg.jpg) 
  
# To Use This Code:
1. Update src/index.js line 3 with your APP ID. Its available in Skill Information tab while submitting.
2. Get the API Key from Google([API Key link](https://developers.google.com/maps/documentation/directions/get-api-key)) and update src/index.js line 166 with your directions api key.

# Sample Conversation:
 •	Please provide the start and end points by area, city and state/country to get the accurate response.
 
    User: Alexa, ask drive time to know my Travel time.
    Alexa: {Greetings} + I can help you to plan your drive. Please say your starting point
    User: Vijaynagar Bangalore
    Alexa: Please say your ending point
    User: Whitefield Bangalore
    Alexa: Fastest route, despite heavy traffic than usual between Vijaynagar Bangalore and Whitefield Bangalore via HAL Old Airport Rd which is 27.9 km. But due to traffic you will reach in 1 hour 23 mins
  
# Value Propositions & Road Map:
1. Navigation support from source to destination with optimal route, distance and time in traffic.
2. Storage of User specific data like frequent addresses such as home, office, gym etc for quick retrieval.
3. Dynamic traffic prediction for user specified times.
4. Optimal routes, distance and time including alternate routes.
5. Integration with User’s calendar to provide reminders and suggestions on best routes and optimal time to start the journey by checking traffic updates.
