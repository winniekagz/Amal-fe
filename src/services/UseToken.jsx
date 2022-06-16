// get  the user data from session storage
export const getUser=()=>{
    const userStr=localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// return tocken from session storage
export const getToken=()=>{
    return localStorage.getItem("jwtToken") || null;
}

// getProjectName
export const getProjectName=()=>{
    return localStorage.getItem("projetName")||null
}

// remove the token and user from session
export const removeUserSession=()=>{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user")
}

// set the tocken and user from session
export const setUserSession=(token,user={name:"name"})=>{
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(user));
}

// save all user Permission to localStoreage

export const getPermissions=()=>{
    return localStorage.getItem("userpermissions") || null;
}
// remove permissions from local storage
export const removePermissions=()=>{
    localStorage.removeItem("userpermissions")
}
export const setUserPermission=(permissions)=>{
    localStorage.setItem('userpermissions', JSON.stringify(permissions));
}