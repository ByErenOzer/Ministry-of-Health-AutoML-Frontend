export async function loginUser(username: string, password: string) {
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Giriş başarısız');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
} 