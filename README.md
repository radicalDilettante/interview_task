# Calculator

This project is a dev interview task for employment. I build an application with Next.js.

I tried to copy the implementation in the provided video as much as I could.

## Sample

[https://wayne-task.netlify.app/](https://wayne-task.netlify.app/)

## Getting started

```
npm install
npm run build
npm start
```

## Total elapsed time

I recorded how long I spent on each commit on the log.
Total Elapsed time is about 10 hours.

## CORS errors

The CORS configuration isn't set up for the provided API. I made an API endpoint with Next.js API route feature to proxy.

## Custom hooks

I made a custom hooks to manipulate data from form and input. I used generic to get more reusability.

## Unit test

```
npm run test
```

I wrote unit test codes only for business logics with Jest, and React Test Library.

## Responsive Layout

I used media query to implement responsive layout for mobile client.

## Sanitized result

The provided API returns negative numbers for borrowing. It is an amount of money, so it could not be a negative number. I sanitized the result before rendering.

It was not required. But if I found it when working, I might ask back about it.

## CSS Modules

I made global variables for CSS styling. It helps to get more maintainability.

## Audit test

I did audit test with Chrome lighthouse tool.
A link to the result is below.

[Link](https://wayne-task.netlify.app/test.html)
