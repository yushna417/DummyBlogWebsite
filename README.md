
# Intern Frontend Assessment – Posts App (React / Next.js)

A small posts application built as part of a frontend assessment. Uses JSONPlaceholder API for posts, comments, and users. Implements client-side pagination, search, sorting, and a create post form with optimistic UI.

---

## **Live Demo (Optional)**
# URL : https://dummy-blog-website.vercel.app/

---

## **Setup / Run Instructions**

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/posts-app.git
cd posts-app
````

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open in browser:**

```
http://localhost:3000
```

5. **Build for production (optional):**

```bash
npm run build
npm run start
```

---

## **Features Implemented**

### ✅ Task 1 – Posts List + Pagination

* Fetches all posts once from `/posts`
* Responsive list display
* Loading and error states
* Basic pagination (Next/Prev buttons implemented)

### ✅ Task 2 – Search + Sort

* Case-insensitive search by post title
* Search bar clearing implemented
* Sort/filter/pagination composition partially implemented

### ✅ Task 3 – Post Details + Comments

*  details page and comments fetching with read more 

### ✅ Task 4 – Create Post Form + Optimistic UI

* Form fields: `title`, `body`, `userId` (1–10)
* Validation: title 3–80 chars, body 10–500 chars
* Optimistic UI: inserts post at top immediately
* Rollback and error display on failure

---

## **Bonus (Optional) Attempted**

* TypeScript used for `Post` (`Ipost`) interface
* Reusable components: `Alert`, `ModalForm` 
* **Not implemented:** URL sync, Context/Zustand state management, debounced search, fully reusable Pagination/Card/Input

---

## **Project Structure**

```
├───api
│       axios.ts
│       
├───app
│   │   favicon.ico
│   │   globals.css
│   │   layout.tsx
│   │   page.tsx
│   │   
│   ├───blog
│   │   │   page.tsx
│   │   │   
│   │   └───[slug]
│   │           page.tsx
│   │
│   └───component
│           alert.tsx
│           empyPage.tsx
│           Footer.tsx
│           loading.tsx
│           modalform.tsx
│           Navbar.tsx
│
└───types
        commentsInterface.ts
        postInterface.ts
        userInterface.ts
```

---



