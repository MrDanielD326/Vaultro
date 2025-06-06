export interface iUser {
    _id: number;
    username: string;
    password: string;
}

// Object returned on insert / update
export interface iResultMySQL {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
};

