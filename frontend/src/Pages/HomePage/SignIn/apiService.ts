// --- 1. Configuration ---

// This is the default URL for a Spring Boot application.
// Change this if your backend runs on a different port.
const BASE_URL = 'http://localhost:8080';

// --- 2. Correct apiFetch Implementation ---

/**
 * A helper function to handle common fetch logic and errors.
 * @param {string} endpoint The API endpoint (e.g., '/api/auth/signin')
 * @param {object} options The options for the fetch call (method, headers, body)
 * @returns {Promise<any>} The response data
 */
async function apiFetch(endpoint: string, options: RequestInit): Promise<any> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Get the response text or JSON
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text(); // For plain text responses
    }

    if (!response.ok) {
        // If the server returns an error, 'data' will be the error message
        const errorMessage = (typeof data === 'object' && data.message) ? data.message : data;
        throw new Error(errorMessage || `HTTP error! Status: ${response.status}`);
    }

    return data;
}

// --- 3. Your signIn Function (which was correct) ---

/**
 * Signs in a user.
 * Corresponds to: POST /api/auth/signin
 */
export async function signIn(username: string, password: string) {
  const signInRequest = {
    username,
    password,
  };

  return apiFetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInRequest),
  });
}

// --- 4. Added signUp function (based on your controller) ---

/**
 * Registers a new user.
 * Corresponds to: POST /api/auth/signup
 */
export async function signUp(formData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
}){

  // We send the whole formData object, which matches your SignUpRequest DTO
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // We send the object directly
    body: JSON.stringify(formData), 
  });
}