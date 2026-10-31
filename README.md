# A React, TypeScript, and Vite application for registering a user, creating a weekly routine, adding exercises, and displaying exercise statistics.

# Features

Register the user's name, age, experience level, and routine name.

Register exercises by day of the week and category.

Display exercises by Category and summary of the exercises

Calculate calories burned.

Calculate pace in minutes per kilometer.

Display total calories burned in the routine.

Calculate average calories burned per training day.

Show the exercise with the longest duration.

Show the exercise that burned the most calories.

Search exercises from the API Ninjas service by muscle group, filtered by the user's level.

Validate external exercises before adding them. Exercises with missing required fields are listed separately and are never added.

Show a unified report grouped by category with local and API exercises.

Store users, exercises, routines and activity in a single generic storage layer (Store<T>) that works with any entity that has a numeric id.

Show a closing dashboard with the global state of the system: users, catalog by source and category, active routines, weekly load per user with a rest recommendation, and recent activity.

Log in with an email, or register a new user from the login screen. Two demo users are loaded when the app starts: carlos@fittracker.com and ana@fittracker.com.

# Installation and Setup

Make sure Node.js is installed on your computer.

Clone the repository:

git clone https://github.com/Josvalle/DUAD-JV-TS.git

Open the project folder:

cd DUAD-JV-TS

Install the dependencies:

npm install

Start the development server:

npm run dev

Open the local address shown by Vite in your browser. It is usually:

http://localhost:5173/

## Environment Variables

Create a .env file in the root of the project:

VITE_NINJA_API=https://api.api-ninjas.com/v1/exercises

VITE_API_KEY=your_api_key_here

You can get a free key at https://api-ninjas.com. The .env file is ignored by git, so the key is never committed.

Restart the development server after changing the .env file.

Vite includes every variable that starts with VITE_ in the JavaScript sent to the browser, so anyone can read the key from the browser. This is acceptable for this exercise, but in a real project the request should go through a backend that keeps the key private and forwards the call to the API.

## Storage Layer

The storage layer lives in src/storage/Store.ts. It is one generic class, Store<T extends { id: number }>, with these operations:

add(item), getAll() (returns a copy), findById(id) (undefined when not found), remove(id) (returns true or false), update(id, changes) (only the fields that change, undefined when not found) and find(predicate).

The data lives in memory only, so it is reset when the page is reloaded.

## TypeScript Validation

To verify that TypeScript does not report errors, run:

npx tsc --noEmit

## Build the Project

npm run build

Author

Josue Valle
