//Funktion til registrering af bruger
export interface RegisterParams {
  Firstname: string;
  Lastname: string;
  email: string;
  password: string;
}

export async function registerUser(params: RegisterParams): Promise<{ message: string; error?: string }> {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: params.Firstname,
        last_name: params.Lastname,
        email: params.email,
        password: params.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: 'Registration failed', error: errorData.message };
    }

    const data = await response.json();
    return { message: 'User registered successfully' };
  } catch (error) {
    return { message: 'An error occurred', error: (error as Error).message };
  }
}

// Funktion til at håndtere bruger login
export async function login(email: string, password: string): Promise<string> {
  const response = await fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to log in");
  }

  const data = await response.json();
  const { access_token } = data;
  localStorage.setItem("access_token", access_token);

  return access_token;
}

// Funktion til at håndtere bruger dokumenter
export async function getUserDocuments(): Promise<Document[]> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch("http://127.0.0.1:5000/api/documents", {  // Corrected URL here
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return response.json();
}

//Funktion til at håndtere analyse af dokumenter
export async function uploadAnalyzeDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/api/upload", {  // Corrected URL here
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Fejl ved upload");
  }

  return response.json();
}
