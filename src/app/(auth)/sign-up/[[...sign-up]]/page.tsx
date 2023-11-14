import { SignUp, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { dark } from '@clerk/themes';

export default function Page() {
  const { userId } = auth();
  if (userId) {
    return redirect('/dashboard');
  }

  return (
    <SignUp
      appearance={{
        baseTheme: dark,
      }}
    />
  );
}
