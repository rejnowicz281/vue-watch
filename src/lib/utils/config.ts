export const EXPRESS_URL =
    process.env.NODE_ENV === "production"
        ? null // TO DO
        : "http://localhost:3000";

export const GITHUB_CLIENT_ID = "Ov23liOoB1wq1DUz6jKA";

export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
