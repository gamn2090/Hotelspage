let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://tambohotels.firebaseapp.com/'
}
else {
        baseUrl = 'http://localhost:8000/'
}

    export const Url = baseUrl