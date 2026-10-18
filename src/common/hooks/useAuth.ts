import { useGetUserProfile } from "../queries";

const useAuth = () => {
  const { data, isLoading, isError } = useGetUserProfile();
  return {
    isLoading,
    isError,
    isAuthenticated: !!data && !isError,
    user: data
  };
};

export default useAuth;
