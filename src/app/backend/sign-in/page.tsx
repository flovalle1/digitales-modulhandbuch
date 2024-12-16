"use client";
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


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
  const session = await signIn(provider.id, { ...formDataObj, redirect: false });
};

export default function CredentialsSignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/backend');
    }
  }, [status, router]);

  return (
    // preview-start
    <SignInPage signIn={signInProvider} providers={providers} />
  )
}