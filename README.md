# About the PB Housing Survey-Nov2025

This page displays information collected in
November 2025 from Lyme NH residents. 
The Planning Board created these questions
over the preceding year.

The main web page has three tabs
showing a summary view of the responses, 
the data from the individual responses, 
and this description of the project.

The responses ccme from the (now closed) survey at
[bit.ly/LymeHousingSurvey2025](https://bit.ly/LymeHousingSurvey2025)

About 180 people filled out the online form. 
Another ~?? people filled out the paper form and
returned it to the Town Offices.

Members of the Planning Board manually entered
those paper forms into the online form. 
Each paper form was numbered, and those numbers were entered manually as the first data in the "Other" field so we could track the data.

## Technical details

_The remainder of this note tells the procedure to create
the data used in this form, so we don't forget/can do it again._

Over the preceding year, the Planning Board created these questions. 
Rich Brown created a [Google form](https://docs.google.com/forms/d/14ZjxzLp04e7Q3lYHhlQvT7OjNpvrkJ5Ge19dYt-7xo4/edit) (requires authorization to access)
to collect the information. 

The data was exported as CSV from Google, then massaged to:

1. Add a column (becomes Column B) to hold the response number. Add "1" in the first row, and numbering each of the rows incrementally
2. Use _src/data/headings.txt_ to replace the headings in the first line of the CSV file
3. For the manually-entered data, remove the [###] from the final question.
5. Convert the CSV to JSON using [http://www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)
  - Select file to upload (copy/paste or use upload)
  - Input options - default (first row is column names)
  - Output options - default
  - Generate **CSV to JSON** (returns an array of JSON objects)
  - Copy/paste to _src/data/respones.js_
6. Add `export const responses = ` and a final `;`
   to convert to a valid Javascript statement

Also create _src/data/questions.js_ with "printable" questions to be displayed for each response.
  It should have the form of a JSON array of strings:

   ```
   export const questions = [ 
     "1. First question",
     "2. Second question",
     ...
     ];
   ```

The web page page script reads data from the
`src/data/responses.js` and `src/data/questions.js` files,
and formats the data.

## Development/Test Procedure

The _index.html_ page drives the appearance of the page.
It has three tabs, as described above.
The Summaries tab collates information from each of the questions.


The repository for these files is at: [https://github.com/richb-hanover/LymeHousingSurvey2025](https://github.com/richb-hanover/LymeHousingSurvey2025)
It contains the original data, as well test procedures for the Javascript and CSS files. 

To develop the software, install dependencies once, then use Vite's development server for automatic reloading:

```sh
npm install
npm run dev   # start the Vite dev server on localhost:5173
```

To create and test a production build:

```sh
npm run build
npm run preview # view the preview on localhost:5173
```

To host the page on Github Pages (for public use):

- Push the repo to Github
- Create set the `base` and
  create `.github/workflows/deploy.yml` as described in
  [Vite's static deployment page](https://vite.dev/guide/static-deploy)
- This creates a "Github Action" that rebuilds and 
  publishes the site every time you push new files to the repo.
