export const register = (formData) => {
    fetch("http://localhost:8080/api/v1/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: formData,
    }).then((res) => res.json())
        .then((result) => {
            console.log("success:", result);
        });

};
