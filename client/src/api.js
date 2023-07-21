// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3ZWE1MzNlYzYxYzIxYWE1YTk1NWEiLCJpYXQiOjE2ODk4NjQ3MTAsImV4cCI6MTY4OTg2ODMxMH0.FCAMPOPO3eOZv2bQkIEgazxJDiPTYmSebqxy3bFIYGM';

// const handleAuthenticatedRequest = async (url, method, body = null) => {
//   try {
//     const response = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3ZWE1MzNlYzYxYzIxYWE1YTk1NWEiLCJpYXQiOjE2ODk4NjQ3MTAsImV4cCI6MTY4OTg2ODMxMH0.FCAMPOPO3eOZv2bQkIEgazxJDiPTYmSebqxy3bFIYGM}`, // Include the token in the 'Authorization' header
//       },
//       body: body ? JSON.stringify(body) : null,
//     });

//     if (response.ok) {
//       return await response.json();
//     } else {
//       // Handle error response
//       throw new Error('Request failed with status ' + response.status);
//     }
//   } catch (error) {
//     // Handle fetch error
//     console.error('Fetch error:', error);
//     throw error;
//   }
// };

// export default handleAuthenticatedRequest;
