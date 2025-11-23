# About the PB Housing Survey-Nov2025

This is information collected in November 2025 from Lyme NH residents. 
The questions for the survey were created by the Lyme Planning Board.

The main web page has three tabs showing a summary view of the responses, 
the data from the individual responses, 
and this description of the project.

The responses come from the 

## How the information was collected

Rich Brown created a Google form at
[bit.ly/LymeHousingSurvey2025](https://bit.ly/LymeHousingSurvey2025)
to collect the information. 

About ??? people entered the data on the form (online). 
Another ~?? people filled out the form on paper and mailed/returned it to the Town Offices.

Members of the Planning Board manually entered
those paper forms into the online form. 
Each paper form was numbered, and those numbers were entered manually as the first data in the "Other" field so we could track the data.

The data was exported as CSV from Google, then massaged to:

1. Add an "entry number" for each entry by converting the manually-entered number to its own column
3. Add a header row to give each of the columns a name
4. Convert the CSV to JSON using [http://www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)
5. Tweak the result to make it a valid Javascript file by assigning the array to `responses` variable
5. This file becomes `Survey-feedback.json`
6. Create a similar file containing the questions. It becomes `Survey-questions.json`

The script on the web page page reads data from the
Survey-feedback.js and Survey-questions.js files,
and formats the data using
a touch of Javascript and CSS.

## Development/Test Procedure

The _index.html_ page drives the appearance of the page.
It has three tabs, as described above.
The Summaries tab collates information from each of the questions.


The repository for these files is at: [https://github.com/richb-hanover/PB\_Housing\_Survey-November2025](https://github.com/richb-hanover/PB\_Housing\_Survey-November2025)
It contains the original data, as well test procedures for the Javascript and CSS files. 

Run the `yarn` command below, then edit any `*.js`, `*.html`, and `*.css` file and the page will automatically reload in Firefox Developer Browser.
Setup files copied from Wes Bos' CSS-Grid course at 
[https://github.com/wesbos/css-grid](https://github.com/wesbos/css-grid)

Run `yarn update --latest` to update to the latest versions of all the dependencies.

``` sh
yarn install # to get started

yarn start # to start monitoring the files in the folder.
```

---
### Tests made to convert from LCDC to PB Survey

- Start modifying README to describe the process
- `yarn update --latest` to get new dependencies
- `yarn start` appears to correctly display old (LCDC) data
- 
