# Project Grid
# ***Project Working Guide***

# **Changes The Way Of Working**

## **Introduction**

Project-Grid is a project management tool that lets you get everything regarding your project under your wrist, whether it could be creating project, creating manager, assign them to project, sending notification, and much more.

## **Platform Access**

Access the ExploreNature platform through **[https://project-grid-index.app](project-grid-index.vercel.app/)**

## **Feature Walkthrough**

Watch our guided video walkthrough: **[Link to Feature Walkthrough](https://youtube-link-to-walkthrough/)**

## **Key Features**

- Learn About Various Species
- Dive Into Diverse Habitats
- Challenge Yourself with Interactive Quizzes
- Embark on a Virtual Nature Tour
- Interact with Simulated AI Nature Guide
- Discover Fun Facts About Nature

## **Design Approach and Assumptions**

- Designed for simplicity and intuitive user experience for demonstration purposes.
- Assumption: Simplified authentication process for the sake of this demo.

## **Installation & Getting Started**

1. Clone the repository: **`git clone <https://github.com/yourusername/explorenature.git>`**
2. Install dependencies: **`npm install`**
3. Start the guided tour: **`npm start`**

## **User Journey**

1. Log in using provided credentials.
2. Explore the diverse species database.
3. Dive into various habitats and their unique features.
4. Engage in interactive quizzes to test your knowledge.
5. Embark on a virtual nature tour, exploring captivating stops.
6. Have fun interacting with our AI nature guide.
7. Enjoy a random nature fact whenever you'd like.

## **API Endpoints**

### **Authentication**

- **`POST /api/auth/register`** - Register a new user.
- **`POST /api/auth/login`** - Log in an existing user.

### **Species**

- **`GET /api/species`** - Retrieve all species.
- **`GET /api/species/:id`** - Retrieve species details.

### **Habitats**

- **`GET /api/habitats`** - Retrieve all habitats.
- **`GET /api/habitats/:id`** - Retrieve habitat details.

... (include more API endpoints as needed)

## **Technology Stack**

- Front-end: React.js
- Back-end: Node.js, Express.js
- Database: PostgreSQL
- Simulated AI Nature Guide: Basic decision-tree interaction
- Fun Fact Generator: Placeholder nature-related facts

---
