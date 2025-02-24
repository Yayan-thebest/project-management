import React, { ReactNode } from 'react';
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        }
    }
});

const formFields = {
    signUp: {
        username: {
            order: 1,
            label: "Username",
            placeholder: "Choose a username",
            isRequired: true,
        },
        email: {
            order: 2,
            label: "Email",
            placeholder: "Enter your email",
            isRequired: true,
            type: "email",
        },
        password: {
            order: 3,
            label: "Password",
            placeholder: "Enter your password",
            isRequired: true,
            type: "password",
        },
        confirm_password: {
            order: 4,
            label: "Confirm Password",
            placeholder: "Confirm your password",
            isRequired: true,
            type: "password",
        },
    },
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <div className='mt-5'>
            <Authenticator formFields={formFields}>
                {({ user }) =>
                    user ? (
                        <div>{children}</div>
                    ) : (
                        <div>
                            <h1>Please sign in below:</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    );
};

export default AuthProvider;
