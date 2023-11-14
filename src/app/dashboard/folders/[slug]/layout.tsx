import { getXataClient } from '@/xata';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function FolderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const xataClient = getXataClient();
  const folder = await xataClient.db.folder
    .filter({
      slug: params.slug,
    })
    .getFirst();
  if (!folder) {
    redirect('/dashboard');
  }

  //   https://dribbble.com/shots/22090352-Campaigns-Dashboard
  return <div>{children}</div>;
}
