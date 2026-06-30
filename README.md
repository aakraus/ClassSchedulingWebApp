# Class Scheduling Web App

A lightweight web app for the University of Redlands - Los Angeles that accepts user-uploaded CSVs containing 300+ course sections and transforms them into normalized meeting records for analysis.

Note: The provided dataset has been modified and does not fully represent the correct dataset held by the university. 

**Tech:** JavaScript, D3.js, Chart.js

## Features
- Upload a CSV for parsing of multi-day/meeting strings (e.g., “Tue …; Thu …”).
- Time-bucket aggregation with count or enrolled weighting.
- D3 heatmap + Chart.js bar chart visualizations.
- Filters: day(s), department, bucket size, weighting.
- “Top 5 suggested time slots” list

## Quick Start
1. Download the zip file from the code dropdown.
2. Locate the zip file and extract it.

At this point you would use your localhost method of choice to get the app running locally on your computer. The steps provided will be for Visual Studio Code.

3. If you haven't already done so, download Visual Studio Code at https://code.visualstudio.com/
4. Launch Visual Studio Code.
5. Once opened, hit file, then open folder, and open the extracted folder containing the code for this project.
6. Open the extensions tab on the left side of Visual Studio Code. 
7. Search "Live Server" and install the extension from Ritwick Day. 
8. Once installed, restart if necessary, and then hit "Go Live" on the bottom of Visual Studio Code.
9. Once the web application is open, select "Choose File" in the Upload CSV box and select the Example_Course_Dataset.csv file
10. That's it! The application should populate with a bar chart and heatmap showing class density, as well as with a top 5 suggestion list for the optimal event times given your current bucket size. You can use the filters to sort by bucket size, weekdays, departments, and weight by enrollment/class count. 


