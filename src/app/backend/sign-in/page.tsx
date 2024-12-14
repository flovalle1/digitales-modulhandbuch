"use client";
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';


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
  const session = await signIn(provider.id, formDataObj);
  console.log(session)
};

export default function CredentialsSignInPage() {
  const router = useRouter()
  return (
    // preview-start
    <SignInPage signIn={signInProvider} providers={providers} />
  )
}