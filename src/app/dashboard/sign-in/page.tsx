"use client";
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { signIn } from "next-auth/react";


// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signInProvider: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const formDataObj: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value.toString();
  });
  await signIn(provider.id, formDataObj, { redirectTo: '/dashboard' });
};

export default function CredentialsSignInPage() {
  return (
    // preview-start
    <SignInPage signIn={signInProvider} providers={providers} />
  )
}