export interface UserType {
    id: number;
    login: string;
    email: string;
    role: string;
}

export interface EnumUsers {
    [index: number]: UserType
}

export interface UserData {
    message: string;
    total: number;
    data: EnumUsers;
}

