# Mambo's Landing Page

This project is a React-based landing page for "Mambo's Fast Food", built with Vite and Tailwind CSS.

## Project Structure

The code has been refactored into a modular structure:

- **`src/components/`**: Contains all the React components.
  - **`ui/`**: Reusable UI components like `ScrollReveal`.
  - **`Navbar.jsx`**: The navigation bar.
  - **`Hero.jsx`**: The main hero section.
  - **`Menu.jsx`**: The menu section with tabs.
  - **`GeminiAI.jsx`**: The AI interaction section.
  - **`Promos.jsx`**: The promotions section.
  - **`Footer.jsx`**: The footer.
- **`src/hooks/`**: Custom hooks.
  - **`useOnScreen.js`**: Hook for detecting element visibility.
- **`src/data/`**: Static data.
  - **`menuItems.js`**: The menu data object.
- **`src/App.jsx`**: The main entry point assembling all components.

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Configuration

1.  Create a `.env` file in the root directory.
2.  Add your Google Gemini API key:
    ```env
    VITE_GOOGLE_API_KEY=your_api_key_here
    ```
3.  The application will automatically load this key.
