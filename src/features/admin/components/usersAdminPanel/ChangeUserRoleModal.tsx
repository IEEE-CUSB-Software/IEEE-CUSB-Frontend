import { useState, useEffect } from 'react';
import { Modal, Select, Button } from '@ieee-ui/ui';
import { useRoles, useUpdateUserRole } from '@/shared/queries/users/users.queries';
import type { User, Role } from '@/shared/types/auth.types';
import toast from 'react-hot-toast';

import { useAppSelector } from '@/shared/store/hooks';
import { RoleName } from '@/shared/types/auth.types';

interface ChangeUserRoleModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ChangeUserRoleModal = ({
  user,
  isOpen,
  onClose,
  isDark,
}: ChangeUserRoleModalProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const isSuperAdmin = currentUser?.role?.name === RoleName.SUPER_ADMIN;
  const { data: rolesData, isLoading: isLoadingRoles } = useRoles();
  const rolesList: Role[] = Array.isArray(rolesData)
    ? rolesData
    : Array.isArray((rolesData as any)?.data)
    ? (rolesData as any).data
    : [];
  const updateRoleMutation = useUpdateUserRole();
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');

  useEffect(() => {
    if (user) {
      setSelectedRoleId(user.role?.id || user.role_id || '');
    }
  }, [user]);

  if (!user || !isSuperAdmin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleId) {
      toast.error('Please select a role');
      return;
    }
    updateRoleMutation.mutate(
      { id: user.id, roleId: selectedRoleId },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const roleOptions = rolesList.map((r: Role) => ({
    value: r.id,
    label: r.name,
  }));

  return (
    <Modal
      title="Change User Role"
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      darkMode={isDark}
    >
      <div className="space-y-6">
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Select a new role for{' '}
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user.name}
          </span>{' '}
          (@{user.username}).
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="user-role-select"
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Select Role *
            </label>
            {isLoadingRoles ? (
              <p className="text-xs text-muted-foreground py-2">Loading roles...</p>
            ) : (
              <Select
                id="user-role-select"
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                options={roleOptions}
                disabled={updateRoleMutation.isPending}
                darkMode={isDark}
                placeholder="Select a role"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              htmlType="button"
              onClick={onClose}
              type="secondary"
              disabled={updateRoleMutation.isPending}
              darkMode={isDark}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              onClick={() => {}}
              type="primary"
              disabled={updateRoleMutation.isPending || !selectedRoleId}
              loading={updateRoleMutation.isPending}
              darkMode={isDark}
            >
              Save Role
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeUserRoleModal;
