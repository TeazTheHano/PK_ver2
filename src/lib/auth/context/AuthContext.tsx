// // lib/auth/context/AuthContext.tsx
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'doctor' | 'staff' | 'patient';
// };

// type AuthContextType = {
//   user: User | null;
//   isLoading: boolean;
//   isAdmin: boolean;
//   isDoctor: boolean;
//   isStaff: boolean;
//   isPatient: boolean;
//   canManageRecords: boolean;
//   canManageMedicines: boolean;
//   canViewPatients: boolean;
//   canDeleteRecords: boolean;
//   canManageBills: boolean;
//   canManagePosts: boolean;
//   canViewLogs: boolean;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isLoading: true,
//   isAdmin: false,
//   isDoctor: false,
//   isStaff: false,
//   isPatient: false,
//   canManageRecords: false,
//   canManageMedicines: false,
//   canViewPatients: false,
//   canDeleteRecords: false,
//   canManageBills: false,
//   canManagePosts: false,
//   canViewLogs: false,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState<User | null>(null);
//   const isLoading = status === 'loading';
//   const router = useRouter();

//   useEffect(() => {
//     if (session?.user) {
//       setUser(session.user as User);
//     } else if (status === 'unauthenticated') {
//       setUser(null);
//     }
//   }, [session, status]);

//   // Define permissions based on user role
//   const isAdmin = user?.role === 'admin';
//   const isDoctor = user?.role === 'doctor';
//   const isStaff = user?.role === 'staff';
//   const isPatient = user?.role === 'patient';

//   // Define capability-based permissions
//   const canManageRecords = isAdmin || isDoctor || isStaff;
//   const canManageMedicines = isAdmin || isDoctor || isStaff;
//   const canViewPatients = isAdmin || isDoctor || isStaff;
//   const canDeleteRecords = isAdmin;
//   const canManageBills = isAdmin || isDoctor || isStaff;
//   const canManagePosts = isAdmin || isDoctor || isStaff;
//   const canViewLogs = isAdmin;

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isAdmin,
//         isDoctor,
//         isStaff,
//         isPatient,
//         canManageRecords,
//         canManageMedicines,
//         canViewPatients,
//         canDeleteRecords,
//         canManageBills,
//         canManagePosts,
//         canViewLogs,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);

// // Component for protected routes
// export const ProtectedRoute = ({ 
//   children, 
//   requiredRole = null
// }: { 
//   children: React.ReactNode;
//   requiredRole?: 'admin' | 'doctor' | 'staff' | 'patient' | null;
// }) => {
//   const { user, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push('/login');
//     }

//     if (!isLoading && user && requiredRole && user.role !== requiredRole) {
//       router.push('/unauthorized');
//     }
//   }, [user, isLoading, router, requiredRole]);

//   if (isLoading || !user) {
//     return <div>Loading...</div>;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return null;
//   }

//   return <>{children}</>;
// };