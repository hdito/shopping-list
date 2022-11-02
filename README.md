# Shopping list
An app for managing your shopping lists.

# Getting started
To work on your own copy of the Shopping list you must create a new Firebase project.

1. Go to the [Firebase console](https://console.firebase.google.com) and create a new project.
2. Connect to your project authentication with Google and by email with password.
3. Enable Firestore Database.
4. Clone this repository to your folder of choise with the terminal command.
   ```
   git clone https://github.com/hdito/shopping-list.git
   ```
5. Go to your project folder and create file `.env`.
6. Add to your project in Firebase Console new web app. You would be given data for firebase config. Copy its contents in file `.env`, change keys to upper case, add underscores between words and prefixe `VITE_` so line `apiKey: '123'` should look like `VITE_API_KEY=123`.
7. Open terminal in your project folder and install necessary dependencies with your package manager.
   
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
8. Run developer server to work on your project.
   
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
9. To enable Firestore security rules you could manually add them or configure Firebase CLI. If you chose the first option copy contents of the `firestore.rules` file to the tab rules in the Firestore settings in [Firebase console](https://console.firebase.google.com). If you want to use Firebase CLI install it with package manager.
    
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
   Now you could run `firebase init` and enable firestore support. To update firestore security rules of your project you need to run in the terminal
   
   ```
   firebase deploy --only firestore:rules
   ```

# Building for production
It's recommended to have separate Firebase project for your production builds.
If you want to create one repeat all steps for initialising new Firebase project and copy config data to file `.env.production`. Then you could run build command with your package manager and Vite will automatically load more specific environment variables in your build.

# Contacts
If you've spotted a bug or want to reach me out send me an email to hditow@gmail.com.