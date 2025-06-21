# SST WEB PORTFOLIO

Access the application here:

# INDEX
- [Short Demo](#short-demo)
- [Technology Stack](#technology-stack)
- [High Level Solution Architecture](#high-level-solution-architecture)
- [Model Diagram](#model-diagram)

- [Software Required](#software-required)
  - [nvm node.js](#nvm-nodejs)
  - [npnm](#npnm)
  - [aws](#aws)

- [Set Up](#set-up)
  - [shadcn](#shadcn)
  - [sst](#sst)
  - [sso](#sso)
  - [sst Configuration](#sst-configuration)
  - [sst Deployment](#sst-deployment)

# Short Demo

# Technology Stack

# High Level Solution Architecture

# Model Diagram

# Software Required
Before starting please have the following installed.

## nvm node.js
- nvm is a version manager for node.js, follow these steps for installation:
   - Install `nvm` (Node Version Manager) from [nvm's GitHub page](https://github.com/nvm-sh/nvm).
   - You can install the latest long term support version of node.js after installing nvm:

      ```
      nvm install --lts
      ```
  - Set default version (recommended):

      ```
      nvm alias default node
      nvm use default
      ```

## npnm
- Install Corepack to get performant npm:
```
corepack enable
corepack prepare pnpm@latest --activate
```
OR
```
npm install -g pnpm
```

## aws
- sst (serverless stack) is built on top of the AWS Cloud Development Kit (CDK) that lets you define, develop, and deploy serverless applications using TypeScript or JavaScript.
- It wraps CDK constructs with higher‑level components (e.g. sst.Api, sst.Function, sst.Nextjs) so you can stand up AWS resources with minimal boilerplate and strong type‑safety.

!! Important things to note: 
- __Requires an AWS acccount__.
- __sst currently has no Windows support__.

- After creating user, obtaining the access key ID and secret access key we can begin.
- Run on cli to enter the aforementioned details. For default region enter in us-east-1 and default output in json. 
```
aws configure
```
- Check s3 buckets to see if you successfully logged in via cli.
```
aws s3 ls
```

# Set Up

## shadcn
- This will spin up the shadcn CLI straight from npm.
- You can choose to add tailwind and select your programming language. 
```
pnpm dlx shadcn@latest init
```

## sst
- Grabs newest template of sst.
```
npx sst@latest init
```

## sso
- __Requires an created organisation and user assigned to that origanisation on AWS.__
- On IAM Identity Center add permissions for the user.
- Click on IAM / AWS access portal URL (ends with `/start`).
- Create sso session with profile named as test. Enter the appropriate details (session name, start url, region, registration scope - can leave on default). 
```
aws configure sso-session --profile test
```
- Sign in via sso login to connect it to the cli.
```
aws sso-login --sso-session test
```
- If you want to see your profiles can run this command:
```
vi ~/.aws/config
```

## sst Configuration
- rename `@workspace` with actual workspace name eg. sst-web-portfolio
<img width="940" alt="workspace" src="https://github.com/user-attachments/assets/c55f44fc-6970-4af6-b3b1-ccb2842c05ae" />
- Replace tsconfig.json, `infra` folder, nextjs.ts, sst.config.ts with the respective ones within the repo.

## sst Deployment
- Run sst locally.
```
AWS_PROFILE = test npx sst dev
```
- To check via local need to download [Dev Console sst link](https://console.sst.dev/) and link up your AWS account and creating a stack.

- Deploy to AWS:
```
AWS_PROFILE = test npx sst deploy --stage develop
```
- Remove from AWS:
```
AWS_PROFILE = test npx sst remove --stage develop
```
