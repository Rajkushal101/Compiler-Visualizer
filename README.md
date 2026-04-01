# Compiler Visualizer

A comprehensive, interactive full-stack application that visualizes the entire 6-phase compilation pipeline. This tool is designed for educational purposes, providing real-time insights into how source code is transformed step-by-step through lexical analysis, syntax analysis, semantic analysis, intermediate representation, optimization, and abstract code generation.

## 🌟 Key Features

- **6-Phase Compilation Pipeline Visualization**: Watch code transform through every stage of compilation.
- **Nested Scope Management & Variable Shadowing**: Accurately demonstrates complex scoping rules and shadowing behaviors.
- **Hierarchical Symbol Table Visualization**: View detailed, structured symbol tables that reflect active variable scopes at each stage.
- **Interactive Abstract Syntax Trees (AST)**: Visual representations of the AST structure dynamically updated after parsing.
- **Premium UI / UX**: A modern, teal-themed, responsive interface crafted with React and Vite.

## 🛠 Technology Stack

### Frontend
- **React (v18)** - Core component library.
- **Vite** - Lightning-fast build tool and development server.
- **react-d3-tree** - For rendering dynamic, interactive scope trees.
- **CSS** - Clean, functional styling adhering to premium design principles.

### Backend
- **FastAPI** - High-performance Python backend framework.
- **Uvicorn** - ASGI server for executing FastAPI applications fast.
- **Pydantic** - Data validation and settings management.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or newer)
- [Python](https://www.python.org/downloads/) (v3.9 or newer)

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup

1. Open a **new** terminal window and navigate to the frontend directory from the project root:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development client:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local server URL provided (typically `http://localhost:5173`).

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests.

## 📝 License
This project is open-source and available under standard educational/personal use allowances. See the `LICENSE` file for full details.
