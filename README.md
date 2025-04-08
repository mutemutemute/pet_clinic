# Pets Medicare - Appointment Management System
Pets Medicare is a full-stack web application for managing pet appointments. Users can register, log in, book appointments, and track their pet’s appointment history, while administrators have access to all appointments and can manage their statuses.

## Tech Stack
Frontend: React + TailwindCSS

Backend: Node.js + Express.js

Database: PostgreSQL 

Authentication: Cookie-based JWT (argon2 for password hashing)

Validation: express-validator

State Management: React Context API

## Features
Authentication & Authorization
User signup & login

Secure password hashing with Argon2

Cookie-based JWT authentication

Role-based access: admin, user

## Appointment Management
Users can:

Create, edit, delete their own appointments

View their own appointments with pagination and filtering

Search appointments by pet name

Rate appointments when status is "Closed"

Admins can:

View all appointments

Filter, search, and paginate all appointments

Change appointment statuses (Pending, Confirmed, Closed)

## Filtering & Pagination
Available to both users and admins

Sort by pet name, owner name, or date

Adjustable items per page
