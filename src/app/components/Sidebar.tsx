import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-2xl mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link href="/dashboard" className="text-white hover:text-gray-400">Dashboard Home</Link>
        </li>
        <li className="mb-4">
          <Link href="/profile" className="text-white hover:text-gray-400">Profile</Link>
        </li>
        <li className="mb-4">
          <Link href="/settings" className="text-white hover:text-gray-400">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
