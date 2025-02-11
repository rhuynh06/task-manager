# Task Manager

Task Manager is a web application built with React and Vite. It allows users to manage their tasks efficiently with features such as adding, editing, deleting, and marking tasks as completed. The application also supports dark mode and persists data using localStorage.

## Features

- **Add Tasks**: Users can add new tasks using an input field and a button.
- **Edit Tasks**: Users can edit existing tasks by clicking on the task text.
- **Delete Tasks**: Users can delete completed tasks.
- **Toggle Task Completion**: Users can mark tasks as completed or incomplete.
- **Dark Mode**: Users can toggle between light and dark themes.
- **Persistent Storage**: Tasks and theme preferences are saved in localStorage.

## Components

### TaskManager

The main component of the application, responsible for managing the state and rendering the task list.

- **State Management**: Uses React's `useState` and `useEffect` hooks to manage tasks, dark mode, and current date/time.
- **Task Operations**: Functions for adding, editing, deleting, and toggling tasks.
- **Dark Mode**: Toggles the dark theme based on user preference.
