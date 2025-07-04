#### https://assignment-4-ph-l2-server.vercel.app 
#### https://assignment-4-ph-l2-client.vercel.app 

# 📚 Minimal Library Management System

A fully functional and minimal library management system built using **React**, **Redux Toolkit Query**, **TypeScript**, **Express.js**, and **MongoDB**. The system allows users to view, manage, and borrow books without authentication. Built with a clean UI, proper state management, and RESTful API integration.

## 🌟 Features

### 🔓 Public Access
- No authentication is required
- All pages and actions are publicly accessible

### 📘 Book Management
- **List Books:** View all books in a tabular format
- **Add Book:** Form to add new book details
- **Edit Book:** Update existing book information
- **Delete Book:** Remove a book with confirmation
- **Borrow Book:** Borrow books via form input
- **Availability Logic:** If `copies === 0`, book is marked as unavailable

### 📗 Borrow System
- **Borrow Form:** Input quantity and due date
- **Validation:** Quantity cannot exceed available copies
- **Auto Update:** Book marked unavailable if no copies left
- **Redirection:** After successful borrow, redirects to borrow summary

### 📊 Borrow Summary
- **Aggregated View:** Total quantity borrowed per book
- **Fields:** Book Title, ISBN, Total Borrowed Quantity

---
