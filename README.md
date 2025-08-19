# Micro-Animations Workspace

This project is a lightweight and performant Angular library for creating reusable micro-interactions and animations. The demo application showcases the library's core directives and their capabilities.

## What the Demo App Uses

The demo application, which you can run locally, uses the following technologies:

* **Angular CLI:** The foundation for the project's development environment.

* **TypeScript:** The primary language for writing the library and component logic.

* **Tailwind CSS:** Used for all styling in the demo, replacing custom SCSS files for a more streamlined approach.

## Animation List

The demo app showcases the following core animations and their uses:

* **`maHover` Directive:**

    * **`pop` preset:** Makes an element slightly larger on hover, great for buttons.

    * **`jiggle` preset:** Adds a subtle shaking effect, useful for drawing attention to an input field.

    * **`fade` preset:** Creates a gentle fade effect on hover.

* **`maAppear` Directive:**

    * **`slide-up-sm` preset:** A simple animation where elements slide up into view.

    * **`fade` preset:** Elements fade in as they enter the viewport.

    * **`slide-in-left` and `slide-in-right` presets:** New dynamic presets that make elements slide in from the left or right, respectively.

## Installation & Running the Demo

Follow these steps to get the project up and running on your local machine.

### Step 1: Install Dependencies

Open your terminal in the project's root directory and install all the necessary packages.


npm install


### Step 2: Run the Demo Application

Once the dependencies are installed, you can launch the demo app.


ng serve


### Step 3: View the App

Open your browser and navigate to `http://localhost:4200/` to see the demo application in action. The app will automatically reload as you change any of the source files.
