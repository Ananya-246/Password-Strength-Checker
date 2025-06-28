# Password-Strength-Checker

SecurePass is a web-based application that allows users to check the strength of their passwords and verify whether they have appeared in known data breaches using the Have I Been Pwned API. It helps users understand password best practices and avoid using weak or compromised passwords.

---

## Features

- Real-time password strength evaluation
- Checks for:
  - Minimum length (12+ characters)
  - Use of uppercase, lowercase, numbers, and special characters
  - Commonly used weak passwords
- Breach detection using Have I Been Pwned (HIBP) API
- Displays how many times the password has appeared in past data breaches
- Clear visual strength meter with suggestions for improvement
- Fully responsive design and user-friendly interface

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Web Crypto API (for SHA-1 hashing)
- Have I Been Pwned API
  
---

## How It Works

1. The user enters a password into the input field.
2. The app evaluates its strength based on key factors (length, character types, etc.).
3. The password is hashed using SHA-1 directly in the browser.
4. The first 5 characters of the SHA-1 hash are sent to the HIBP API.
5. The API responds with a list of matching hash suffixes and their breach counts.
6. The app checks if the full hash appears in the list and displays if breach has occured or not.
