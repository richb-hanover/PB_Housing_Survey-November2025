# About the PB Housing Survey-Nov2025

This is information collected in November 2025 from Lyme NH residents. 
The questions for the survey were created by the Lyme Planning Board.

The main web page has three tabs showing a summary view of the responses, 
the data from the individual responses, 
and this description of the project.

The responses come from the 

## Collecting the survey results

Rich Brown created a Google form at
[bit.ly/LymeHousingSurvey2025](https://bit.ly/LymeHousingSurvey2025)
to collect the information. 

About ??? people entered the data on the form (online). 
Another ~?? people filled out the form on paper and mailed/returned it to the Town Offices.

Members of the Planning Board manually entered
those paper forms into the online form. 
Each paper form was numbered, and those numbers were entered manually as the first data in the "Other" field so we could track the data.

The data was exported as CSV from Google, then massaged to:

1. Add a column (becomes Column B) to hold the response number. Add "1" in the first row, and numbering each of the rows incrementally
2. Use _src/data/headings.txt_ to replace the headings in the first line of the CSV file
3. For the manually-entered data, remove the [###] from the final question.
4. Synchronize the response numbers? (No - just start the paper versions at the next one after the final electronic entry)
5. Convert the CSV to JSON using [http://www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)
  - Select file to upload (copy/paste or use upload)
  - Input options - default (first row is column names)
  - Output options - default
  - Generate **CSV to JSON** (returns an array of JSON objects)
  - Copy/paste to _src/data/respones.js_
6. Add `export const responses = ` and a final `;`
   to convert to a valid Javascript statement

Also create _Survey-questions.json_ with "printable" questions to be displayed for each response.
  It should have the form of a JSON array of strings:

   ```
   questions = [ 
     "Timestamp", 
     "First question",
     "Second question",
     ...
     ];
   ```

The web page page scripts read data from the
`src/data/responses.js` and `src/data/questions.js` modules,
and format the data using
a touch of Javascript and CSS.

## Development/Test Procedure

The _index.html_ page drives the appearance of the page.
It has three tabs, as described above.
The Summaries tab collates information from each of the questions.


The repository for these files is at: [https://github.com/richb-hanover/PB\_Housing\_Survey-November2025](https://github.com/richb-hanover/PB\_Housing\_Survey-November2025)
It contains the original data, as well test procedures for the Javascript and CSS files. 

Install dependencies once, then use Vite's dev server for automatic reloading:

```sh
npm install
npm run dev   # start the Vite dev server on localhost:5173
```

To create a production build:

```sh
npm run build
```

---
### Tests made to convert from LCDC to PB Survey

- Start modifying README to describe the process
- `yarn update --latest` to get new dependencies
- `yarn start` appears to correctly display old (LCDC) data
- Created _Survey-feedback.json_ from housing results (with "Response" column.
- Switch back to _LCDC-feedback.json_ and switch files to Typescript (.ts suffix); add "type: module" to package.json
- Switch to using Chart.js directly (not MDBootstrap)
- Switch to using Vite.js 
