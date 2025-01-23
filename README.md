# Larder Ai

This uses AWS Amplify to build a serverless web application powered by Generative AI using Amazon Bedrock and the Claude 3 Sonnet foundation model. Users can enter a list of ingredients, and the application will generate delicious recipes based on the input ingredients. The application includes an HTML-based user interface for ingredient submission and a backend web app to request AI-generated recipes.


# Application Architecture

The following diagram provides a visual representation of the services used in this tutorial and how they are connected. This application uses AWS Amplify, a GraphQL API built with AWS AppSync, AWS Lambda, and Amazon Bedrock.

![Application Architecture](/build-serverless-app.png)


From the tutorial
https://aws.amazon.com/getting-started/hands-on/build-serverless-web-app-lambda-amplify-bedrock-cognito-gen-ai/


# To run locally

`npm install` 
`amplify config`   (if required)
`npx ampx sandbox` (until you see [Sandbox] Watching for file changes... File written: amplify_outputs.json)
`npm run dev`