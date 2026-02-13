import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from './auth.api';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setUser, setTokens, clearAuth } from '@/shared/store/slices/authSlice';

/**
 * Hook to get the current authenticated user
 * Fetches user data on app load if there's a valid token
 */
export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const accessToken = useAppSelector(state => state.auth.access_token);

  return useQuery({
    queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
    queryFn: async () => {
      const data = await authApi.getMe();
      dispatch(setUser(data.user));
      return data.user;
    },
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    // If the request fails (e.g., token expired), clear auth
    meta: {
      onError: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        dispatch(clearAuth());
      },
    },
  });
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Update Redux store
      dispatch(setUser(data.user));
      dispatch(
        setTokens({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.CURRENT_USER });

      toast.success('Login successful! Welcome back.');
      navigate('/');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook for user registration
 * Default role is Visitor - cannot be changed by user
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: data => {
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Update Redux store
      dispatch(setUser(data.user));
      dispatch(
        setTokens({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.CURRENT_USER });

      toast.success('Registration successful! Welcome to IEEE CUSB.');
      navigate('/');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Clear Redux store
      dispatch(clearAuth());

      // Clear all queries
      queryClient.clear();

      toast.success('Logged out successfully.');
      navigate('/login');
    },
    onError: () => {
      // Even if API call fails, clear local data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      dispatch(clearAuth());
      queryClient.clear();
      navigate('/login');
    },
  });
};

/**
 * Hook to send email OTP for verification
 */
export const useSendEmailOTP = () => {
  return useMutation({
    mutationFn: authApi.sendEmailOTP,
    onSuccess: () => {
      toast.success('OTP sent to your email. Please check your inbox.');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to send OTP. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook to verify email with OTP
 */
export const useVerifyEmailOTP = () => {
  return useMutation({
    mutationFn: authApi.verifyEmailOTP,
    onSuccess: () => {
      toast.success('Email verified successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook to send password reset OTP
 */
export const useSendPasswordOTP = () => {
  return useMutation({
    mutationFn: authApi.sendPasswordOTP,
    onSuccess: () => {
      toast.success('OTP sent to your email for password reset.');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to send OTP. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook to reset password with OTP
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to reset password. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook to change password (requires authentication)
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to change password. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook to complete OAuth profile
 */
export const useCompleteOAuthProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.completeOAuthProfile,
    onSuccess: () => {
      // Invalidate current user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.CURRENT_USER });

      toast.success('Profile completed successfully!');
      navigate('/');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to complete profile. Please try again.';
      toast.error(message);
    },
  });
};
