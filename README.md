# Shopping list
An app for managing your shopping lists.

## Getting started
To work on your own copy of the Shopping list you need a new Firebase project.

1. Go to the [Firebase console](https://console.firebase.google.com) and create a new project.
2. Connect to your project authentication with Google and by email with password.
3. Enable Firestore Database.
4. Clone this repository to your folder of choise with the terminal command.
   ```
   git clone https://github.com/hdito/shopping-list.git
   ```
5. Go to your project folder and create file `.env.development`.
6. Add a new web app to your project in Firebase Console. You would be given data for a firebase config. Copy its contents to file `.env.development`, change the keys from camelCase format to CONSTANT_CASE and add to them prefixe `VITE_` so line `apiKey: 'abc123'` should look like `VITE_API_KEY=abc123`.
7. Open the terminal in your project folder and install necessary dependencies with your preferred package manager.
   
   npm:
   ```
   npm install
   ```
   Yarn:
   ```
   yarn
   ```
   pnpm:
   ```
   pnpm install
   ```
8. Run the developer server to work on your project with a command `dev`.
   
   npm:
   ```
   npm run dev
   ```
   Yarn:
   ```
   yarn run dev
   ```
   pnpm:
   ```
   pnpm dev
   ```
9. To enable Firestore security rules you could manually add them or configure the Firebase CLI. If you choose the first option copy contents of the file `firestore.rules` to the tab Rules in the Firestore settings in [Firebase console](https://console.firebase.google.com). Or if you want to use the Firebase CLI install it with your package manager.
    
   npm:
   ```
   npm install -g firebase-tools
   ```
   Yarn:
   ```
   yarn install -g firebase-tools
   ```
   pnpm:
   ```
   pnpm install -g firebase-tools
   ```
   Login your tools.
   ```
   firebase login
   ```
   Now you could run `firebase init` to enable firestore support and link your working folder to the Shopping list Firebase project. Ensure that you use existing files for the Firestore configuration. To update firestore security rules of your project you need to run in the terminal
   
   ```
   firebase deploy --only firestore:rules
   ```

## Building for production
It's recommended to have separate Firebase projects for your production builds and development so you can't accidentally change user's data.

If you want to create another project repeat all steps for initialising new Firebase project, copy config data to file `.env.production` and add new project alias with a command

```
firebase use --add
```
Now you could switch between projects with thir aliases by executing
```
firebase use <alias>
```

If you prefer to use one project for all purposes rename your environment variables file from `.env.development` to `.env`.

After you've setup your working directory for production build you could run `build` command with your package manager and Vite will automatically load suitable environment variables in your project.

## Contacts
If you've spotted a bug or want to reach me out send me an email to hditow@gmail.com.