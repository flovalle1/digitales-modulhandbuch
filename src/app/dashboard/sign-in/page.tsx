"use client";
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};

export default function CredentialsSignInPage() {
  return (
    // preview-start
    <SignInPage signIn={signIn} providers={providers} />
  )
}