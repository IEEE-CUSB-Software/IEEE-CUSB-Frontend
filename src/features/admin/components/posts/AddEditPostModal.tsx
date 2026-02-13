import React from 'react';
import { Button, InputField, Modal, TextArea, ImageUpload } from '@ieee-ui/ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.any().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface AddEditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any; // Replace with proper type later
}

const AddEditPostModal: React.FC<AddEditPostModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      image: post?.image || '',
    },
  });

  const imageValue = watch('image');

  const onSubmit = async (data: PostFormData) => {
    console.log('Mock save post:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onClose();
  };

  return (
    <Modal
      title={post ? 'Edit Post' : 'Create New Post'}
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputField
                label="Post Title"
                id="post-title"
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter post title"
                error={errors.title?.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextArea
                label="Content"
                id="post-content"
                value={field.value}
                onChange={field.onChange}
                placeholder="Write your post content..."
                error={errors.content?.message}
              />
            )}
          />
        </div>

        <ImageUpload
          label="Post Image"
          value={imageValue}
          onChange={base64 =>
            setValue('image', base64, { shouldValidate: true })
          }
          error={errors.image?.message as string}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="secondary"
            width="auto"
          />
          <Button
            buttonText={post ? 'Save Changes' : 'Create Post'}
            onClick={handleSubmit(onSubmit)}
            type="primary"
            width="auto"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddEditPostModal;
