import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiEdit2, FiTrash2, FiUsers, FiCalendar } from 'react-icons/fi';
import AddEditEventModal from '@/features/admin/components/eventAdminPanel/AddEditEventModal';
import EventDetailModal from '@/features/admin/components/eventAdminPanel/EventDetailModal';
import { EventRegistrationsModal } from '@/features/admin/components/eventAdminPanel/EventRegistrationsModal';
import { ConfirmDeleteModal } from '@/shared/components/ConfirmDeleteModal';
import { AdminMobileCard } from '@/shared/components/AdminMobileCard';
import { type ColumnDef } from '@ieee-ui/ui';
import { Pagination } from '@/shared/components/ui/Pagination';
import {
  SectionHeader,
  AddButton,
  ResponsiveDataList,
  SearchBar,
  LoadingBlock,
  EmptyBlock,
} from '@/features/admin/components/shared/AdminPageComponents';
import {
  useEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
} from '@/shared/queries/events';
import type { Event } from '@/shared/types/events.types';
import type { EventFormData } from '@/features/admin/types/eventFormTypes';
import {
  convertApiEventToAdminEvent,
  convertFormDataToCreateRequest,
  convertFormDataToUpdateRequest,
  type AdminEvent,
} from '@/features/admin/utils/eventConversion';
import toast from 'react-hot-toast';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper function to determine event status
const getEventStatus = (event: Event): 'Upcoming' | 'Ongoing' | 'Completed' => {
  const now = new Date();
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  if (now < startTime) return 'Upcoming';
  if (now >= startTime && now <= endTime) return 'Ongoing';
  return 'Completed';
};

export const EventsPage = () => {
  const { isDark } = useTheme();

  /* API hooks */
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useEvents({ page, limit });
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const events = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );
  const totalPages = data?.totalPages ?? 1;

  /* Modal state */
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [selectedAdminEvent, setSelectedAdminEvent] = useState<AdminEvent | undefined>(undefined);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [deleteEventTarget, setDeleteEventTarget] = useState<Event | null>(null);
  const [isRegistrationsModalOpen, setIsRegistrationsModalOpen] = useState(false);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] =
    useState<Event | undefined>(undefined);
  const [search, setSearch] = useState('');

  /* Filtered list */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    );
  }, [events, search]);

  /* Handlers */
  const handleAdd = useCallback(() => {
    setSelectedEvent(undefined);
    setSelectedAdminEvent(undefined);
    setIsEventModalOpen(true);
  }, []);

  const handleEdit = useCallback((event: Event) => {
    setSelectedEvent(event);
    setSelectedAdminEvent(convertApiEventToAdminEvent(event));
    setIsEventModalOpen(true);
  }, []);

  const handleDelete = useCallback((event: Event) => {
    setDeleteEventTarget(event);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteEventTarget) return;
    deleteEventMutation.mutate(deleteEventTarget.id, {
      onSuccess: () => setDeleteEventTarget(null),
    });
  }, [deleteEventMutation, deleteEventTarget]);

  const handleViewRegistrations = useCallback((event: Event) => {
    setSelectedEventForRegistrations(event);
    setIsRegistrationsModalOpen(true);
  }, []);

  const handleView = useCallback((event: Event) => {
    setViewEvent(event);
  }, []);

  const handleCloseView = useCallback(() => {
    setViewEvent(null);
  }, []);

  const handleSaveEvent = async (formData: EventFormData) => {
    try {
      if (selectedEvent) {
        const updateData = convertFormDataToUpdateRequest(formData);
        await updateEventMutation.mutateAsync({
          id: selectedEvent.id,
          data: updateData,
        });
      } else {
        const createData = convertFormDataToCreateRequest(formData);
        await createEventMutation.mutateAsync(createData);
      }

      setIsEventModalOpen(false);
      setSelectedEvent(undefined);
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error?.response?.data?.message || 'Failed to save event');
    }
  };

  const handleClose = useCallback(() => {
    setIsEventModalOpen(false);
    setSelectedEvent(undefined);
    setSelectedAdminEvent(undefined);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Table columns */
  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        header: 'Event',
        cell: (item: Event) => (
          <div
            onClick={() => handleView(item)}
            className="flex items-center gap-3 min-w-0 cursor-pointer"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-primary/20' : 'bg-primary/10'
              }`}
            >
              <FiCalendar
                className={`w-4 h-4 ${isDark ? 'text-primary-light' : 'text-primary'}`}
              />
            </div>
            <div className="min-w-0">
              <p
                className={`font-semibold text-sm truncate hover:underline ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </p>
              <p
                className={`text-xs truncate ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {formatDate(item.start_time)} · {item.location}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: 'Category',
        cell: (item: Event) => {
          const categoryColors: Record<string, string> = {
            Technical: isDark
              ? 'bg-blue-900/30 text-blue-300'
              : 'bg-blue-50 text-blue-700',
            'Non-Technical': isDark
              ? 'bg-purple-900/30 text-purple-300'
              : 'bg-purple-50 text-purple-700',
            Social: isDark
              ? 'bg-orange-900/30 text-orange-300'
              : 'bg-orange-50 text-orange-700',
          };
          const color =
            categoryColors[item.category] ||
            (isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-700');
          return (
            <div onClick={() => handleView(item)} className="cursor-pointer">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
              >
                {item.category}
              </span>
            </div>
          );
        },
      },
      {
        header: 'Capacity',
        cell: (item: Event) => (
          <div onClick={() => handleView(item)} className="cursor-pointer">
            <span
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {item.is_full ? (
                <span className={isDark ? 'text-red-400' : 'text-red-500'}>
                  Full ({item.capacity})
                </span>
              ) : (
                `${item.remainingSpots}/${item.capacity}`
              )}
            </span>
          </div>
        ),
        className: 'text-center',
      },
      {
        header: 'Status',
        cell: (item: Event) => {
          const status = getEventStatus(item);
          const statusColors = {
            Upcoming: isDark
              ? 'bg-green-900/30 text-green-300'
              : 'bg-green-50 text-green-700',
            Ongoing: isDark
              ? 'bg-blue-900/30 text-blue-300'
              : 'bg-blue-50 text-blue-700',
            Completed: isDark
              ? 'bg-gray-800 text-gray-400'
              : 'bg-gray-50 text-gray-700',
          };
          return (
            <div onClick={() => handleView(item)} className="cursor-pointer">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
              >
                {status}
              </span>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        className: 'text-right',
        cell: (item: Event) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleEdit(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
              title="Edit event"
            >
              <FiEdit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleViewRegistrations(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
              title="View registrations"
            >
              <FiUsers className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleDelete(item)}
              className={`group p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Delete event"
            >
              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ),
      },
    ],
    [isDark, handleEdit, handleDelete, handleViewRegistrations, handleView]
  );

  const isPending = createEventMutation.isPending || updateEventMutation.isPending;

  return (
    <div className="space-y-6">
      {/* ── Page header ─────────────────────────────────────── */}
      <SectionHeader
        icon={<FiCalendar className="w-5 h-5 text-primary" />}
        title="Event Management"
        subtitle="Create and manage upcoming events"
        isDark={isDark}
        action={<AddButton label="Add Event" onClick={handleAdd} />}
      />

      {/* ── Search bar ──────────────────────────────────────── */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by title, description, or location…"
        isDark={isDark}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      {isLoading ? (
        <LoadingBlock isDark={isDark} text="Loading events…" />
      ) : filtered.length === 0 ? (
        <EmptyBlock
          isDark={isDark}
          message={search ? 'No matching events' : 'No events yet'}
          onAdd={!search ? handleAdd : undefined}
          addLabel="Add Event"
        />
      ) : (
        <>
          <ResponsiveDataList
            data={filtered}
            columns={columns}
            isDark={isDark}
            renderMobileCard={(event) => (
              <AdminMobileCard
                isDark={isDark}
                title={event.title}
                subtitle={`${formatDate(event.start_time)} · ${event.location}`}
                badge={getEventStatus(event)}
                description={event.description}
                avatar={
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}>
                    <FiCalendar className={`w-5 h-5 ${isDark ? 'text-primary-light' : 'text-primary'}`} />
                  </div>
                }
                onEdit={() => handleEdit(event)}
                onDelete={() => handleDelete(event)}
                onView={() => handleView(event)}
                extraActions={[{
                  icon: <FiUsers className="w-3.5 h-3.5" />,
                  label: 'Registrations',
                  onClick: () => handleViewRegistrations(event),
                  color: 'info'
                }]}
              />
            )}
          />

          {/* Result count */}
          {search && (
            <p
              className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Showing {filtered.length} of {events.length} events
            </p>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Edit / Add Modal */}
      {isEventModalOpen && (
        <AddEditEventModal
          isOpen={isEventModalOpen}
          onClose={handleClose}
          onSave={handleSaveEvent}
          event={selectedAdminEvent}
          apiEvent={selectedEvent}
          isLoading={isPending}
        />
      )}

      {/* Detail Modal */}
      <EventDetailModal event={viewEvent} onClose={handleCloseView} />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteEventTarget}
        itemName={deleteEventTarget?.title ?? ''}
        entityLabel="event"
        isDark={isDark}
        isPending={deleteEventMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteEventTarget(null)}
      />

      {/* Registrations Modal */}
      {isRegistrationsModalOpen && selectedEventForRegistrations && (
        <EventRegistrationsModal
          isOpen={isRegistrationsModalOpen}
          onClose={() => {
            setIsRegistrationsModalOpen(false);
            setSelectedEventForRegistrations(undefined);
          }}
          eventId={selectedEventForRegistrations.id}
          eventTitle={selectedEventForRegistrations.title}
        />
      )}
    </div>
  );
};
