import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { useTheme } from '@/shared/hooks/useTheme';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  phone: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const MembershipContactForm = () => {
  const { isDark } = useTheme();
  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const inputClassName = `w-full px-4 py-3 rounded-lg border text-sm transition-colors duration-300 outline-none focus:ring-2 focus:ring-primary/40 ${
    isDark
      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
  }`;

  const errorClassName = 'text-red-500 text-xs mt-1';

  return (
    <section
      className={`py-12 md:py-24 px-6 ${isDark ? 'bg-gray-900' : 'bg-background'}`}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`p-8 md:p-12 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white shadow-lg'
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HiMail className="w-7 h-7 text-primary" />
            </div>
            <h2
              className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Become an IEEE Member
            </h2>
            <p
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              We are here to help you through the membership process. For any
              inquiries, contact us!
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-600 dark:border-yellow-700/50 rounded-xl p-5 mb-8 text-center text-dark">
            <p className="text-sm font-medium">
              Our automated emailing system is currently under maintenance. 
              <br className="mb-2" />
              For membership applications or inquiries, please email us directly at <a href="mailto:membership@ieeecusb.org" className="font-bold underline hover:text-yellow-100 transition-colors">membership@ieeecusb.org</a>.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 opacity-50 select-none">
            <fieldset disabled className="space-y-5">
              <div>
                <input
                  {...register('name')}
                  placeholder="Your Name"
                  className={inputClassName}
                />
                {errors.name && (
                  <p className={errorClassName}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('phone')}
                  placeholder="Phone Number (optional)"
                  className={inputClassName}
                />
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  className={inputClassName}
                />
                {errors.email && (
                  <p className={errorClassName}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register('message')}
                  placeholder="Your Message"
                  rows={4}
                  className={`${inputClassName} resize-none`}
                />
                {errors.message && (
                  <p className={errorClassName}>{errors.message.message}</p>
                )}
              </div>

              <button
                type="button"
                disabled
                className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
              >
                Service Currently Unavailable
              </button>
            </fieldset>
          </form>

          <p
            className={`text-center text-xs mt-6 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Or email us directly at{' '}
            <a
              href="mailto:membership@ieeecusb.org"
              className="text-primary hover:underline"
            >
              membership@ieeecusb.org
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
