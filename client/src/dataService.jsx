import env from "./config/env";

const apiURL = env.API_URL+'/';
export async function loginUser(creadentials) {
    return fetch(apiURL + 'users/login', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(creadentials)
    })
    .then(data => data.json())
}

export async function getUserList(token) {
    
    return fetch(apiURL + 'users/users_list', {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function getUserDetails(token, id) {
    
    return fetch(apiURL + 'users/getUserDetails/' + id, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function deleteUser(token, id) {
    
    return fetch(apiURL + 'users/deleteUser/' + id, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function getLatestUser(token) {
    
    return fetch(apiURL + 'users/latest_users_list', {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function getTopUsers(token) {
    
    return fetch(apiURL + 'users/top_users_list', {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function getUserDevices(token) {
    
    return fetch(apiURL + 'users/getDevicesShare', {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function getTotalUsers(token) {
    
    return fetch(apiURL + 'users/getUserNumbers', {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'authorization': token
        }
    })
    .then(data => data.json())
}

export async function signUpUser(body) {
    return fetch(apiURL + 'users/signUp', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
}