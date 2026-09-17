export type AuthSession =
     |{status:'loading'}
     |{status:'anonymous'}
     |{
    status:'authenticated';
    user:{
        id:string;
        name?: string;
        email?: string;
    };
};
