import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import { PaginationParams } from '@/shared/types/committees.types';
import { committeeApi } from './committees.api';

/**
 * see all committees
 */
export const useEvents = (params: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.EVENTS.ALL, params.page, params.limit],
    queryFn: () => committeeApi.getCommittees(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
/**
 * create a committee
 */

/**
 * delete a committee
 */

/**
 * update a committee
 */

/**
 * see committees of certain category
 */

/**
 * add a new category
 */

/**
 * delete a category
 */
