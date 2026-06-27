import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBriefcase, HiOutlineTrash, HiOutlineClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { useTheme } from '@/shared/hooks/useTheme';
import { useAppSelector } from '@/shared/store/hooks';
import { RoleName } from '@/shared/types/auth.types';
import { Select, InputField, TextArea, Button, Loader } from '@ieee-ui/ui';
import { useNavigate } from 'react-router-dom';
import {
  useGetVacancies,
  useApplyToVacancy,
  useGetMyApplications,
  useRevokeApplication,
} from '@/shared/queries/recruitment';
import { Application } from '@/shared/types/recruitment.types';

const recruitmentSchema = z.object({
  vacancy_id: z.string().min(1, 'Please select a vacancy'),
  portfolio: z.string().url('Must be a valid URL (e.g. https://github.com/...)').or(z.literal('')).optional(),
  why_join: z.string().min(10, 'Please tell us why you want to join (min 10 characters)').trim(),
});

type RecruitmentFormData = z.infer<typeof recruitmentSchema>;

export const RecruitmentApplicationForm = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const isAdmin =
    user?.role?.name === RoleName.ADMIN ||
    user?.role?.name === RoleName.SUPER_ADMIN;

  const { data: vacancies = [], isLoading: isLoadingVacancies } = useGetVacancies();
  const { data: myApplications = [], isLoading: isLoadingMyApps } = useGetMyApplications();
  const applyMutation = useApplyToVacancy();
  const revokeMutation = useRevokeApplication();

  const openVacancies = vacancies.filter(v => v.is_open);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecruitmentFormData>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      vacancy_id: '',
      portfolio: '',
      why_join: '',
    },
  });

  const onSubmit = async (data: RecruitmentFormData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    await applyMutation.mutateAsync({
      vacancyId: data.vacancy_id,
      data: {
        extra_data: {
          why_join: data.why_join,
          portfolio: data.portfolio || undefined,
        },
      },
    });

    reset();
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'ACCEPTED': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'REJECTED': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'ACCEPTED': return <HiCheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <HiXCircle className="w-4 h-4" />;
      default: return <HiOutlineClock className="w-4 h-4" />;
    }
  };

  return (
    <section className={`py-12 md:py-24 px-6 ${isDark ? 'bg-gray-900' : 'bg-background'}`}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`lg:col-span-7 p-8 md:p-12 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HiBriefcase className="w-7 h-7 text-primary" />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Join Our Team
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Check out our open vacancies and apply to become part of IEEE CUSB!
            </p>
          </div>

          {!isAuthenticated ? (
            <div className={`text-center p-8 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sign in to Apply
              </h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                You must be logged in to view your applications and apply for open vacancies.
              </p>
              <Button buttonText="Login / Register" onClick={() => navigate('/login')} type="primary" darkMode={isDark} />
            </div>
          ) : isAdmin ? (
            <div className={`text-center p-8 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                <HiOutlineClock className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Admins Cannot Apply
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your current role as {user?.role?.name} restricts you from applying to open vacancies.
              </p>
            </div>
          ) : isLoadingVacancies ? (
            <div className="flex justify-center py-12"><Loader size="large" /></div>
          ) : openVacancies.length === 0 ? (
            <div className={`text-center p-8 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                There are no open vacancies at the moment.
              </p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Please check back later!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Controller
                name="vacancy_id"
                control={control}
                render={({ field }) => (
                  <Select
                    id="vacancy_id"
                    label="Select Vacancy"
                    options={[
                      { label: 'Choose a role...', value: '' },
                      ...openVacancies.map(v => ({ label: v.title, value: v.id }))
                    ]}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.vacancy_id?.message}
                    darkMode={isDark}
                  />
                )}
              />

              <Controller
                name="portfolio"
                control={control}
                render={({ field }) => (
                  <InputField
                    id="portfolio"
                    label="Portfolio / LinkedIn URL (Optional)"
                    placeholder="https://..."
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.portfolio?.message}
                    darkMode={isDark}
                  />
                )}
              />

              <Controller
                name="why_join"
                control={control}
                render={({ field }) => (
                  <TextArea
                    id="why_join"
                    label="Why do you want to join us?"
                    placeholder="Tell us about your motivation..."
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.why_join?.message}
                    darkMode={isDark}
                  />
                )}
              />

              <Button
                buttonText="Submit Application"
                type="primary"
                width="full"
                loading={applyMutation.isPending}
                disabled={applyMutation.isPending}
                darkMode={isDark}
                onClick={() => {}}
              />
            </form>
          )}
        </motion.div>

        {/* Right Side: My Applications */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:col-span-5 self-start p-6 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-md'}`}
          >
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Applications
            </h3>
            
            {isLoadingMyApps ? (
              <div className="flex justify-center py-8"><Loader size="medium" /></div>
            ) : myApplications.length === 0 ? (
              <div className={`text-center py-8 rounded-xl border border-dashed ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  You haven't applied to any vacancies yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {myApplications.map((app) => {
                    const vacancy = vacancies.find(v => v.id === app.vacancy_id);
                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className={`p-4 rounded-xl border relative group transition-all ${isDark ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold text-sm pr-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {vacancy?.title || 'Unknown Role'}
                          </h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)} {app.status}
                          </span>
                        </div>
                        
                        <p className={`text-xs mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-medium">Why join:</span> {app.extra_data.why_join}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Applied {new Date(app.created_at).toLocaleDateString()}
                          </span>
                          
                          {app.status === 'PENDING' && (
                            <button
                              onClick={() => {
                                if(window.confirm('Are you sure you want to revoke this application?')) {
                                  revokeMutation.mutate(app.id);
                                }
                              }}
                              disabled={revokeMutation.isPending}
                              className={`text-[10px] font-medium flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                                isDark 
                                  ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' 
                                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                              } disabled:opacity-50`}
                            >
                              <HiOutlineTrash className="w-3 h-3" />
                              Revoke
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
