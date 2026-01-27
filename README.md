# SST WEB PORTFOLIO

Access the application here:

# INDEX
- [Short Demo](#short-demo)
- [Technology Stack](#technology-stack)
- [High Level Solution Architecture](#high-level-solution-architecture)
- [Model Diagram](#model-diagram)

- [Software Required](#software-required)
  - [aws](#aws)
  - [nvm node.js](#nvm-nodejs)
  - [npnm](#npnm)

- [Set Up](#set-up)
  - [shadcn](#shadcn)
  - [sst](#sst)
  - [sst Configuration](#sst-configuration)
  - [sst Deployment](#sst-deployment)
  - [Database](#database)
  - [Prisma](#prisma)
 
- [Optional](#optional)
  - [SSO](#sso)

# 📋 TODO List
- Error Handling & SS Validation (Comment Inputs & CREATE - Blog, Project, Experience & Education).
- Context uplift for Blog, Project, Experience & Education (eg. add dot point capability into content property).
- getData --> GET() via next api routes instead for: BlogLatest, BlogPost & ProjectPost.
- S3 Bucket Upload feature for technology logos for Projects.
- Fix Darkmode (eg. content text should be white vs. dark grey).
- Mobile responsivity.
- Image linking to GitHub (for ProjectPost).
- Fix formatting for education route.ts
- Seed data

# Short Demo

# Technology Stack

# High Level Solution Architecture

# Model Diagram

# Software Required
Please have these preliminary steps completed!

## AWS
- __Only required if deploying application using sst.__
- sst (serverless stack) is built on top of the AWS Cloud Development Kit (CDK) that lets you define, develop, and deploy serverless applications using TypeScript or JavaScript.
- It wraps CDK constructs with higher‑level components (e.g. sst.Api, sst.Function, sst.Nextjs) so you can stand up AWS resources with minimal boilerplate and strong type‑safety.

1. Create an AWS account if you don't have one already.
2. Log into AWS Console.
3. Navigate to IAM (Identity & Access Management).
4. Create a new user (eg. sst-user).
5. Obtain the access key ID and secret access key so we can begin.

- Run on this command in the CLI. If no profile seperator is provided it will be a [default] profile. 
```
aws configure --profile test
```
- Provide these details (can skip region name and output format by pressing enter).
```
AWS Access Key ID [None]: <your key>
AWS Secret Access Key [None]: <your secret>
Default region name [None]: us-east-1
Default output format [None]: json
```
- Check s3 buckets to see if you successfully logged in via cli.
```
aws s3 ls
```

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

## sst Configuration
- rename `@workspace` with actual workspace name eg. sst-web-portfolio
<img width="940" alt="workspace" src="https://github.com/user-attachments/assets/c55f44fc-6970-4af6-b3b1-ccb2842c05ae" />
- Replace tsconfig.json, `infra` folder, nextjs.ts, sst.config.ts with the respective ones within the repo.

## sst Deployment
- Run sst locally. To check via local need to download [Dev Console sst link](https://console.sst.dev/) and link up your AWS account and creating a stack.
```zsh
AWS_PROFILE=test npx sst dev
```
OR
```powerbash
$env:AWS_PROFILE="test"
npx sst dev
```

- Deploy to AWS:
```
AWS_PROFILE=test npx sst deploy --stage develop
```
- Remove from AWS:
```
AWS_PROFILE=test npx sst remove --stage develop
```

## Database
- After this you should set up a DB.
- I will be using Neon due to cost constraints.
- Alternatively, you could deploy the database on AWS via SST.

## Prisma
- Installs Prisma packages
```
pnpm add -D prisma
pnpm add @prisma/client    
```

- Initialise Prisma (creates prisma/schema.prisma and .env).
```
pnpm dlx prisma init   
```

- Connect the DB to prisma by updating the URL in .env.
- Reads schema.prisma, connects to the DB (based on DATABASE_URL) and creates/updates tables to match current models.
- NOTE: It does overwrite history so recommended to use `prisma migrate` in production later.
```
pnpm dlx prisma db push
```

- To access the Prisma Studio GUI run the following command:
```
pnpm dlx prisma studio
```

- Generate initial migration.
```
pnpm dlx prisma migrate dev --name init
```

- Generates a migration file with only the changes.
- Updates the database without dropping data.
- Maintains a complete migration history.
- Create later migrations using:
```
pnpm dlx prisma migrate dev --name ""
```

- Full reset of db if there are severe issues.
```
pnpm dlx prisma migrate reset
```

---------------------

# Optional
## SSO
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
